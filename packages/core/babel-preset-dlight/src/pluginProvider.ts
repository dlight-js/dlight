import * as t from "@babel/types"
import { type BabelPath } from "./types"
import { minimatch } from "minimatch"
import { parseView } from "./viewParser"
import { isAssignmentExpressionLeft, isAssignmentExpressionRight, isMemberInEscapeFunction, isMemberInManualFunction } from "./utils/depChecker"
import { generateView, type IdentifierToDepNode } from "./viewGenerator"

type PropertyContainer = Record<string, {
  node: t.ClassProperty | t.ClassMethod
  deps: string[]
  isStatic?: boolean
  isContent?: boolean
  isChildren?: boolean
  isWatcher?: boolean
  isPropOrEnv?: "Prop" | "Env"
}>

const devMode = process.env.NODE_ENV !== "production"

export class PluginProvider {
  // ---- Const Level
  private readonly escapeNamings = ["escape", "$"]
  private readonly availableDecoNames = ["Static", "Prop", "Env", "Content", "Children"]
  private readonly dlightDefaultImportName = "@dlightjs/dlight"
  private readonly dlightImportName = this.dlightDefaultImportName

  // ---- Plugin Level
  private readonly enableDevTools: boolean
  private readonly includes: string[]
  private readonly excludes: string[]

  constructor(includes: string[], excludes: string[], enableDevTools: boolean) {
    this.includes = includes
    this.excludes = excludes
    this.enableDevTools = devMode && enableDevTools
  }

  // ---- DLight class Level
  private classRootPath?: BabelPath
  private classDeclarationNode?: t.ClassDeclaration | t.ClassExpression
  private classBodyNode?: t.ClassBody
  private derivedPairNode?: t.ClassProperty
  private propertiesContainer: PropertyContainer = {}
  private fullDepMap: Record<string, string[]> = {}
  private enter = true

  // ---- File Level
  private programNode?: t.Program
  private allImports: t.ImportDeclaration[] = []
  private didAlterImports = false

  /* ---- DLight Class Level Hooks ---- */
  /**
   * @brief Clear all DLight Node Level variables after a class is transformed
   */
  clearNode() {
    this.classRootPath = undefined
    this.classDeclarationNode = undefined
    this.classBodyNode = undefined
    this.derivedPairNode = undefined
    this.propertiesContainer = {}
    this.fullDepMap = {}
    this.enter = true
    this.allImports = []
    this.didAlterImports = false
  }

  /**
   * @brief Initialize DLight Node Level variables when entering a class
   * @param path
   */
  initNode(path: BabelPath) {
    this.classRootPath = path
    const node: t.ClassDeclaration | t.ClassExpression = path.node
    this.classDeclarationNode = node
    this.classBodyNode = node.body
    this.derivedPairNode = t.classProperty(
      t.identifier("_$derivedPairs"),
      t.objectExpression([])
    )
    this.propertiesContainer = {}
    // ---- If devtools is enabled, add _$compName property to the class
    if (this.enableDevTools) {
      this.classBodyNode.body.unshift(
        t.classProperty(
          t.identifier("_$compName"),
          t.stringLiteral(node.id?.name ?? `Anonymous_${this.randomId()}`)
        )
      )
    }
    // ---- Add dlight import and alter import name,
    //      Only do this when enter the first dlight class
    if (!this.didAlterImports) {
      // ---- Get DLight imports
      const dlightImports = this.allImports.filter(n => n.source.value === this.dlightDefaultImportName)
      // ---- Alter import name, e.g. "@dlight/dlight-client"
      if (this.dlightImportName !== this.dlightDefaultImportName) {
        dlightImports.forEach(i => {
          i.source.value = this.dlightImportName
        })
      }
      const alreadyImported = dlightImports.some(n => (
        n.specifiers.some(s => (
          t.isImportDefaultSpecifier(s) &&
          s.local.name === "DLight"
        ))
      ))
      if (!alreadyImported && this.programNode) {
        // ---- Add a new default import to the head of file
        this.programNode.body.unshift(
          t.importDeclaration(
            [t.importDefaultSpecifier(t.identifier("DLight"))],
            t.stringLiteral(this.dlightImportName)
          )
        )
      }
      this.didAlterImports = true
    }
  }

  transformDLightClass() {
    const usedProperties = this.handleView(Object.keys(this.propertiesContainer))
    const propertyArr = Object.entries(this.propertiesContainer).reverse()

    for (const [key, { node, deps, isStatic, isChildren, isPropOrEnv, isWatcher, isContent }] of propertyArr) {
      if (isChildren) {
        this.resolveChildrenDecorator(node as t.ClassProperty)
        continue
      }
      if (deps.length > 0) {
        usedProperties.push(...deps)
        this.pushDerivedPair(key, deps)
        if (isWatcher) this.resolveWatcherDecorator(node as t.ClassMethod)
        else this.valueWithArrowFunc(node as t.ClassProperty)
      }
      if (isPropOrEnv) {
        this.resolvePropDecorator(node as t.ClassProperty, isPropOrEnv)
        if (isContent) this.resolveContentDecorator(node as t.ClassProperty)
      }
      if (isStatic) continue
      if (usedProperties.includes(key)) {
        this.resolveStateDecorator(node as t.ClassProperty)
      }
    }
  }

  /* ---- DLight Class View Handlers ---- */
  handleView(deps: string[]) {
    if (!this.classBodyNode) return []
    const usedProperties: string[] = []
    let body: undefined | t.ClassMethod
    const subViewNodes: t.ClassMethod[] = []
    for (let viewNode of this.classBodyNode.body) {
      if (!t.isClassProperty(viewNode) && !t.isClassMethod(viewNode)) continue
      if (!t.isIdentifier(viewNode.key)) continue
      const isSubView = this.getDecoratorNames(viewNode.decorators).includes("SubView")
      const isBody = viewNode.key.name === "Body"
      if (!isSubView && !isBody) continue

      if (t.isClassProperty(viewNode)) {
        // ---- Handle TSAsExpression, e.g. MyView = (() => {}) as Type1 as Type2
        let exp = viewNode.value
        while (t.isTSAsExpression(exp)) exp = exp.expression
        if (!t.isArrowFunctionExpression(viewNode.value)) continue
        viewNode.value = exp
        // ---- Transform arrow function property into method
        const newViewNode = this.arrowFunctionPropertyToMethod(viewNode)
        if (!newViewNode) continue
        viewNode = newViewNode
      }

      if (isSubView) {
        viewNode.decorators = null
        subViewNodes.push(viewNode)
      } else {
        body = viewNode
      }
    }
    subViewNodes.forEach(this.alterSubViewProps.bind(this))

    const subViewNames = subViewNodes.map(v => (v.key as t.Identifier).name)

    subViewNodes.forEach(viewNode => {
      usedProperties.push(...this.alterView(viewNode, deps, subViewNames, true))
    })

    body && usedProperties.push(...this.alterView(body, deps, subViewNames))

    return usedProperties
  }

  alterSubViewProps(view: t.ClassMethod) {
    const param = view.params[0]
    // ---- SubView only accept one object parameter, e.g. MyView({ count, flag }) {}
    if (!param || !t.isObjectPattern(param)) return

    const propNames = new Set<string>()
    for (const property of param.properties) {
      if (t.isRestElement(property)) continue
      if (!t.isIdentifier(property.key)) continue
      propNames.add(property.key.name)
      // ---- When the prop is assigned a default value, e.g. { a = 1 },
      //      turn this prop into a standard dlight subview prop,
      //      e.g. { a: { value: 1, deps: [] } }
      if (t.isAssignmentPattern(property.value)) {
        property.value.right = t.objectExpression([
          t.objectProperty(
            t.identifier("value"),
            property.value.right
          ),
          t.objectProperty(
            t.identifier("deps"),
            t.arrayExpression()
          )
        ])
      }
    }
    // ---- Traverse all identifiers in the subview and replace them with .value,
    //      e.g. count => count.value
    // ---- Because we cannot traverse BlockStatement directly,
    //      and we cannot traverse this method with parameters(we need to keep the parameters),
    //      so we wrap the method with a function and traverse the function
    this.classRootPath.scope.traverse(
      t.functionDeclaration(null, [], view.body),
      {
        Identifier: (innerPath: BabelPath) => {
          const currentNode = innerPath.node
          const parentNode = innerPath.parentPath.node
          // ---- Skip if
          //      1. it's not a prop of the subview
          //      2. it's a property of a member expression, e.g. my.count
          //      3. it's a key of an object, e.g. { count: 1 }
          if (
            !propNames.has(currentNode.name) ||
            this.isMemberExpressionProperty(parentNode, currentNode) ||
            this.isObjectKey(parentNode, currentNode)
          ) return
          // ---- Replace the identifier with .value
          innerPath.replaceWith(
            t.optionalMemberExpression(
              t.identifier(currentNode.name),
              t.identifier("value"),
              false,
              true
            )
          )
          innerPath.skip()
        }
      })
  }

  alterView(viewNode: t.ClassMethod, deps: string[], subViewNames: string[], isSubView = false) {
    let identifierToDepsMap: Record<string, IdentifierToDepNode[]> = {}
    if (isSubView && t.isObjectPattern(viewNode.params[0])) {
      const propNames: string[] = viewNode.params[0].properties.map((p: any) => p.key.name)
      identifierToDepsMap = propNames.reduce<Record<string, IdentifierToDepNode[]>>((acc, propName) => {
        // ---- ...(${propName}?.deps ?? [])
        acc[propName] = [
          t.arrayExpression([
            t.spreadElement(
              t.logicalExpression(
                "??",
                t.optionalMemberExpression(
                  t.identifier(propName),
                  t.identifier("deps"),
                  false,
                  true
                ),
                t.arrayExpression()
              )
            )
          ]).elements[0]!
        ]
        return acc
      }, {})
    }

    // ---- First string literal in a statement block is directives
    //      but in DLight it's still TextNode, so put them and all the body nodes into viewStatements
    const viewStatements = [...viewNode.body.directives, ...viewNode.body.body]

    const [code, usedProperties] = generateView(
      parseView(this.classRootPath, viewStatements),
      this.classRootPath,
      this.fullDepMap,
      subViewNames,
      identifierToDepsMap
    )
    viewNode.body = code

    return usedProperties
  }

  pushDerivedPair(name: string, deps: string[]) {
    if (!this.classBodyNode) return
    if (!this.derivedPairNode) return
    (this.derivedPairNode.value as t.ObjectExpression).properties.unshift(
      t.objectProperty(
        t.identifier(name),
        t.arrayExpression(deps.map(dep => t.stringLiteral(dep)))
      )
    )
    if (!this.classBodyNode.body.includes(this.derivedPairNode)) {
      this.classBodyNode.body.unshift(this.derivedPairNode)
    }
  }

  /* ---- Babel Visitors ---- */
  private visitProgram(_path: BabelPath): void {}
  programVisitor(path: BabelPath, state: { filename: string }): void {
    this.enter = this.fileAllowed(state.filename)
    if (!this.enter) return
    this.allImports = path.node.body.filter(t.isImportDeclaration)
    const dlightImports = this.allImports.filter(n => n.source.value === this.dlightDefaultImportName)
    if (dlightImports.length === 0) {
      this.enter = false
      return
    }
    this.programNode = path.node
    this.visitProgram(path)
  }

  private enterClass(_path: BabelPath): void {}
  classEnter(path: BabelPath): void {
    if (!this.enter) return
    if (!this.isDLightView(path)) return
    this.initNode(path)
    this.enterClass(path)
  }

  private exitClass(_path: BabelPath): void {}
  classExit(path: BabelPath): void {
    if (!this.enter) return
    if (!this.isDLightView(path)) return
    this.transformDLightClass()
    this.exitClass(path)
    this.clearNode()
  }

  private visitClassMethod(_path: BabelPath): void {}
  classMethodVisitor(path: BabelPath): void {
    if (!this.enter) return
    if (!t.isIdentifier(path.node.key)) return
    const node: t.ClassMethod = path.node
    const key = (node.key as t.Identifier).name
    if (key === "Body") return
    this.bindMethod(key)
    const isSubView = this.getDecoratorNames(node.decorators).includes("View")
    if (isSubView) return

    // ---- Handle watcher
    // ---- Get watcher decorator or watcher function decorator
    // ---- Watcher auto collect deps:
    //       @Watch
    //       watcher() { myFunc() }
    const isWatcher = (d: t.Decorator) => (
      t.isIdentifier(d.expression) &&
      d.expression.name === "Watch"
    )
    const watcher = node.decorators?.find(isWatcher)
    // ---- Watcher function manual set deps:
    //       @Watch(["count", "flag"])
    //       watcherFunc() { myFunc() }
    const isWatcherFunc = (d: t.Decorator) => (
      t.isCallExpression(d.expression) &&
      t.isIdentifier(d.expression.callee) &&
      d.expression.callee.name === "Watch"
    )
    const watcherFunc = node.decorators?.find(isWatcherFunc)
    if (!watcher && !watcherFunc) return
    // ---- Get dependencies from watcher decorator or watcher function decorator
    let deps: string[] = []
    if (watcher) {
      deps = this.getDependencies(path)
    } else {
      const listenDeps = (watcherFunc!.expression as t.CallExpression).arguments[0]
      if (t.isArrayExpression(listenDeps)) {
        deps = listenDeps.elements
          .filter(arg => t.isStringLiteral(arg))
          .map(arg => (arg as t.StringLiteral).value)
        deps = [...new Set(deps)]
      }
    }
    // ---- Register watcher to propertiesContainer
    this.propertiesContainer[key] = {
      node,
      deps,
      isWatcher: true
    }
    node.decorators = node.decorators?.filter(d => !isWatcher(d) && !isWatcherFunc(d))

    this.visitClassMethod(path)
  }

  private visitClassProperty(_path: BabelPath): void {}
  classPropertyVisitor(path: BabelPath): void {
    if (!this.enter) return
    if (!t.isIdentifier(path.node.key)) return
    const node: t.ClassMethod = path.node
    const key = (node.key as t.Identifier).name
    if (key === "Body") return
    const decoNames = this.getDecoratorNames(node.decorators)
    const isSubView = decoNames.includes("SubView")
    if (isSubView) return
    const isProp = decoNames.includes("Prop")
    const isEnv = decoNames.includes("Env")
    const deps = isProp || isEnv
      ? []
      : this.getDependencies(path)

    this.propertiesContainer[key] = {
      node,
      deps,
      isStatic: decoNames.includes("Static"),
      isContent: decoNames.includes("Content"),
      isChildren: decoNames.includes("Children"),
      isPropOrEnv: isProp ? "Prop" : (isEnv ? "Env" : undefined)
    }

    node.decorators = node.decorators?.filter(d => !(
      t.isIdentifier(d.expression) &&
      this.availableDecoNames.includes(d.expression.name)
    ))

    this.visitClassProperty(path)
  }

  /* ---- Decorator Resolvers ---- */
  /**
   * @brief Decorator resolver: Watcher
   * Add:
   * _$$${propertyName} = "Watcher"
   * @param node
   */
  resolveWatcherDecorator(node: t.ClassMethod): void {
    if (!this.classBodyNode) return
    if (!t.isIdentifier(node.key)) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode.body.indexOf(node)
    const watcherNode = t.classProperty(
      t.identifier(`_$$${key}`),
      t.stringLiteral("Watcher")
    )
    this.classBodyNode.body.splice(propertyIdx, 0, watcherNode)
  }

  /**
   * @brief Decorator resolver: Children
   * Add:
   * get ${propertyName}() {
   *  return this._$childrenFuncs()
   * }
   * @param node
   */
  resolveChildrenDecorator(node: t.ClassProperty) {
    if (!this.classBodyNode) return
    if (!t.isIdentifier(node.key)) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode.body.indexOf(node)

    const getterNode = t.classMethod("get", t.identifier(key), [],
      t.blockStatement([
        t.returnStatement(
          t.callExpression(
            t.memberExpression(
              t.thisExpression(),
              t.identifier("_$childrenFuncs")
            ), []
          )
        )
      ])
    )
    this.classBodyNode.body.splice(propertyIdx, 1, getterNode)
  }

  /**
   * @brief Decorator resolver: Content
   * Add:
   * _$contentProp = "propertyName"
   * @param node
   */
  resolveContentDecorator(node: t.ClassProperty) {
    if (!this.classBodyNode) return
    if (!t.isIdentifier(node.key)) return

    // ---- Already has _$contentProp
    if (this.classBodyNode.body.some(n => (
      t.isClassProperty(n) &&
      (n.key as t.Identifier).name === "_$contentProp")
    )) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode.body.indexOf(node)

    const derivedStatusKey = t.classProperty(
      t.identifier("_$contentProp"),
      t.stringLiteral(key)
    )
    this.classBodyNode.body.splice(propertyIdx, 0, derivedStatusKey)
  }

  /**
   * @brief Decorator resolver: Prop/Env
   * Add:
   * _$$$${propertyName} = ${decoratorName}
   * @param node
   */
  resolvePropDecorator(node: t.ClassProperty, decoratorName: "Prop" | "Env") {
    if (!this.classBodyNode) return
    if (!t.isIdentifier(node.key)) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode.body.indexOf(node)
    const tag: string = decoratorName.toLowerCase()

    const derivedStatusKey = t.classProperty(
      t.identifier(`_$$$${key}`),
      t.stringLiteral(tag)
    )
    this.classBodyNode.body.splice(propertyIdx, 0, derivedStatusKey)
  }

  /**
   * @brief Decorator resolver: State
   * Add:
   *  _$${propertyName}Deps = new Set()
   *  get ${propertyName}() {
   *    return this._$$${propertyName}
   *  }
   *  set ${propertyName}(value) {
   *    this._$updateProperty("${propertyName}", value)
   *  }
   * @param node
   */
  resolveStateDecorator(node: t.ClassProperty) {
    if (!this.classBodyNode) return
    if (!t.isIdentifier(node.key)) return
    const key = node.key.name
    node.key.name = `_$$${key}`
    const propertyIdx = this.classBodyNode.body.indexOf(node)

    const depsNode = t.classProperty(
      t.identifier(`_$$${key}Deps`),
      t.newExpression(t.identifier("Set"), [])
    )

    const getterNode = t.classMethod("get", t.identifier(key), [],
      t.blockStatement([
        t.returnStatement(
          t.memberExpression(
            t.thisExpression(),
            t.identifier(`_$$${key}`)
          )
        )
      ])
    )

    const setterNode = t.classMethod("set", t.identifier(key), [
      t.identifier("value")
    ],
    t.blockStatement([
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.thisExpression(),
            t.identifier("_$updateProperty")
          ), [
            t.stringLiteral(key),
            t.identifier("value")
          ]
        )
      )
    ])
    )

    this.classBodyNode.body.splice(propertyIdx + 1, 0, depsNode, getterNode, setterNode)
  }

  /* ---- Helper Functions ---- */
  /**
   * @brief Test if the file is allowed to be transformed
   * @param fileName
   * @returns is file allowed
   */
  private fileAllowed(fileName: string | undefined): boolean {
    if (!fileName) return false
    if (this.excludes.some(pattern => minimatch(fileName, pattern))) return false
    if (!this.includes.some(pattern => minimatch(fileName, pattern))) return false
    return true
  }

  /**
   * @brief Test if the class is a dlight view
   * @param path
   * @returns
   */
  private isDLightView(path: BabelPath): boolean {
    const node = path.node
    const decorators = node.decorators ?? []
    const isDecorator = decorators.find((deco: t.Decorator) => t.isIdentifier(deco.expression, { name: "View" }))
    if (isDecorator) {
      node.superClass = t.identifier("View")
      node.decorators = node.decorators?.filter((deco: t.Decorator) => (
        !t.isIdentifier(deco.expression, { name: "View" })
      ))
    }
    return t.isIdentifier(node.superClass, { name: "View" })
  }

  /**
   * @brief Get decorator names as string array
   * @param decorators
   * @returns decorator names
   */
  private getDecoratorNames(decorators: t.Decorator[] | undefined | null): string[] {
    if (!decorators) return []
    return decorators
      .filter(deco => t.isIdentifier(deco.expression))
      .map(deco => (deco.expression as t.Identifier).name)
  }

  /**
   * @brief Generate random id
   * @param length
   * @returns random id
   */
  private randomId(length = 4): string {
    return Math.random().toString(36).slice(2).substring(length)
  }

  /**
   * @brief Bind method's this to the class
   * @param methodName
   */
  private bindMethod(methodName: string): void {
    if (!this.classBodyNode) return
    let constructorNode: t.ClassMethod | undefined = this.classBodyNode.body
      .find(n => t.isClassMethod(n) && t.isIdentifier(n.key) && n.key.name === "constructor") as t.ClassMethod | undefined
    // ---- Add constructor if not exists
    if (!constructorNode) {
      constructorNode = t.classMethod(
        "constructor",
        t.identifier("constructor"),
        [],
        t.blockStatement([
          t.expressionStatement(t.callExpression(t.super(), []))
        ])
      )
      this.classBodyNode.body.unshift(constructorNode)
    }
    // ---- Add method binding to constructor, e.g. this.methodName = this.methodName.bind(this)
    constructorNode.body.body.push(
      t.expressionStatement(
        t.assignmentExpression(
          "=",
          t.memberExpression(
            t.thisExpression(),
            t.identifier(methodName)
          ),
          t.callExpression(
            t.memberExpression(
              t.memberExpression(
                t.thisExpression(),
                t.identifier(methodName)
              ),
              t.identifier("bind")
            ),
            [t.thisExpression()]
          )
        )
      )
    )
  }

  /**
   * @brief Get all valid dependencies of a babel path
   * @param path
   * @returns dependencies
   */
  getDependencies(path: BabelPath): string[] {
    const node = path.node
    const availableProperties = Object.entries(this.propertiesContainer)
      .filter(([, { isWatcher, isStatic }]) => !isWatcher && !isStatic)
      .map(([key]) => key)
    // ---- Deps: console.log(this.count)
    const deps = new Set<string>()
    // ---- Assign deps: this.count = 1 / this.count++
    const assignDeps = new Set<string>()
    path.scope.traverse(node, {
      MemberExpression: (innerPath: BabelPath) => {
        const propertyKey = innerPath.node.property.name
        if (isAssignmentExpressionLeft(innerPath)) {
          assignDeps.add(propertyKey)
        } else if (
          availableProperties.includes(propertyKey) &&
          t.isThisExpression(innerPath.node.object) &&
          !isMemberInEscapeFunction(innerPath, this.classDeclarationNode) &&
          !isMemberInManualFunction(innerPath, this.classDeclarationNode) &&
          !isAssignmentExpressionRight(innerPath, this.classDeclarationNode)
        ) {
          deps.add(propertyKey)
          this.fullDepMap[propertyKey].forEach(deps.add.bind(deps))
        }
      }
    })

    // ---- Eliminate deps that are assigned in the same method
    //      e.g. { console.log(this.count); this.count = 1 }
    //      this will cause infinite loop
    //      so we eliminate "count" from deps
    assignDeps.forEach(deps.delete.bind(deps))

    // ---- Add deps to fullDepMap
    const propertyKey = (node.key as t.Identifier).name
    this.fullDepMap[propertyKey] = [...deps]

    return this.fullDepMap[propertyKey]
  }

  /**
   * @brief Transform arrow function property to method
   * @param propertyNode
   * @returns new method node
   */
  arrowFunctionPropertyToMethod(propertyNode: t.ClassProperty): t.ClassMethod | undefined {
    if (t.isArrowFunctionExpression(propertyNode.value)) return
    let newNode: t.ClassMethod | undefined
    this.classRootPath.scope.traverse(this.classBodyNode, {
      ClassProperty: (innerPath: any) => {
        if (innerPath.node !== propertyNode) return
        const propertyBody = (propertyNode.value as t.ArrowFunctionExpression).body
        const body = t.isExpression(propertyBody) ? t.blockStatement([t.returnStatement(propertyBody)]) : propertyBody
        const methodNode = t.classMethod(
          "method",
          propertyNode.key,
          (propertyNode.value as t.ArrowFunctionExpression).params,
          body
        )
        newNode = methodNode
        innerPath.replaceWith(methodNode)
      }
    })
    return newNode
  }

  /**
   * @brief Check if a member expression is a property of a member expression
   * @param parentNode
   * @param currentNode
   * @returns is a property of a member expression
   */
  isMemberExpressionProperty(parentNode: t.Node, currentNode: t.Node): boolean {
    return t.isMemberExpression(parentNode) && !parentNode.computed && parentNode.property === currentNode
  }

  /**
   * @brief Check if a member expression is a key of an object
   * @param parentNode
   * @param currentNode
   * @returns is a key of an object
   */
  isObjectKey(parentNode: t.Node, currentNode: t.Node): boolean {
    return t.isObjectProperty(parentNode) && parentNode.key === currentNode
  }

  /**
   * @brief Add arrow function to property value
   * @param node
   */
  valueWithArrowFunc(node: t.ClassProperty): void {
    if (!node.value) {
      node.value = t.identifier("undefined")
    }
    node.value = t.arrowFunctionExpression([], node.value)
  }
}
