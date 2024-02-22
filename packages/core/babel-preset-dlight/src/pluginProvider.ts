import type babel from "@babel/core"
import { types as t, type NodePath } from "@babel/core"
import {
  type PropertyContainer,
  type HTMLTags,
  type SubViewPropSubDepMap,
} from "./types"
import { minimatch } from "minimatch"
import { parseView } from "@dlightjs/view-parser"
import { parseReactivity } from "@dlightjs/reactivity-parser"
import { generateSubView, generateView } from "@dlightjs/view-generator"
import {
  alterAttributeMap,
  availableDecoNames,
  defaultHTMLTags,
  devMode,
  dlightDefaultPackageName,
  importMap,
  importsToDelete,
  reactivityFuncNames,
} from "./const"

export class PluginProvider {
  private readonly dlightPackageName = dlightDefaultPackageName

  // ---- Plugin Level
  private readonly babelApi: typeof babel
  private readonly t: typeof t
  private readonly traverse: typeof babel.traverse
  private readonly enableDevTools: boolean
  private readonly includes: string[]
  private readonly excludes: string[]
  private readonly htmlTags: string[]
  private readonly attributeMap: Record<string, string[]>

  constructor(
    babelApi: typeof babel,
    types: typeof t,
    includes: string[],
    excludes: string[],
    enableDevTools: boolean,
    htmlTags: HTMLTags,
    attributeMap: Record<string, string[]>
  ) {
    this.babelApi = babelApi
    this.t = types
    this.traverse = babelApi.traverse
    this.includes = includes
    this.excludes = excludes
    this.enableDevTools = devMode && enableDevTools
    this.htmlTags =
      typeof htmlTags === "function"
        ? htmlTags(defaultHTMLTags)
        : htmlTags.includes("*")
          ? [...new Set([...defaultHTMLTags, ...htmlTags])].filter(
              tag => tag !== "*"
            )
          : htmlTags
    this.attributeMap = attributeMap
  }

  // ---- DLight class Level
  private classDeclarationNode?: t.ClassDeclaration
  private classBodyNode?: t.ClassBody
  private propertiesContainer: PropertyContainer = {}
  private dependencyMap: Record<string, string[]> = {}
  private enter = true
  private dLightModel = false
  private enterClassNode = false
  private className?: string

  // ---- File Level
  private programNode?: t.Program
  private allImports: t.ImportDeclaration[] = []
  private didAlterImports = false

  /* ---- DLight Class Level Hooks ---- */
  /**
   * @brief Clear all DLight Node Level variables after a class is transformed
   */
  clearNode() {
    this.classDeclarationNode = undefined
    this.classBodyNode = undefined
    this.propertiesContainer = {}
    this.dependencyMap = {}
    this.enter = true
    this.enterClassNode = false
    this.dLightModel = false
    this.className = undefined
  }

  private get availableProperties(): string[] {
    return Object.entries(this.propertiesContainer)
      .filter(
        ([key, { isWatcher, isStatic, isChildren }]) =>
          key !== "_$compName" && !isWatcher && !isStatic && !isChildren
      )
      .map(([key]) => key)
  }

  /**
   * @brief Initialize DLight Node Level variables when entering a class
   * @param path
   */
  initNode(path: NodePath<t.ClassDeclaration>): void {
    const node: t.ClassDeclaration = path.node
    this.classDeclarationNode = node
    this.classBodyNode = node.body
    this.propertiesContainer = {}

    if (!node.id?.name) {
      node.id = this.t.identifier(`Anonymous_${PluginProvider.uid()}`)
    }
    this.className = node.id?.name

    // ---- Custom decorators
    this.handleClassCustomDecorators()

    // ---- If devtools is enabled, add _$compName property to the class
    if (this.enableDevTools) {
      this.classBodyNode.body.unshift(
        this.t.classProperty(
          this.t.identifier("_$compName"),
          this.t.stringLiteral(this.className)
        )
      )
    }

    // ---- Add dlight import and alter import name,
    //      Only do this when enter the first dlight class
    if (!this.didAlterImports) {
      // ---- Get DLight imports
      const dlightImports = this.allImports.filter(
        n => n.source.value === dlightDefaultPackageName
      )
      // ---- Alter import name, e.g. "@dlight/dlight-client"
      if (this.dlightPackageName !== dlightDefaultPackageName) {
        dlightImports.forEach(i => {
          i.source.value = this.dlightPackageName
        })
      }

      // ---- remove all tag-import
      dlightImports.forEach(importNode => {
        importNode.specifiers = importNode.specifiers.filter(
          specifier =>
            !(
              this.t.isImportSpecifier(specifier) &&
              this.t.isIdentifier(specifier.imported) &&
              importsToDelete.includes(specifier.imported.name)
            )
        )
      })

      // ---- Add nodes import to the head of file
      this.programNode!.body.unshift(
        this.t.importDeclaration(
          Object.entries(importMap).map(([key, value]) =>
            this.t.importSpecifier(
              this.t.identifier(value),
              this.t.identifier(key)
            )
          ),
          this.t.stringLiteral(this.dlightPackageName)
        )
      )
      this.didAlterImports = true
    }
  }

  /* ---- Babel Visitors ---- */
  programEnterVisitor(
    path: NodePath<t.Program>,
    filename: string | undefined
  ): void {
    this.enter = this.fileAllowed(filename)
    if (!this.enter) return
    this.allImports = path.node.body.filter(n =>
      this.t.isImportDeclaration(n)
    ) as t.ImportDeclaration[]
    const dlightImports = this.allImports.filter(
      n => n.source.value === dlightDefaultPackageName
    )
    if (dlightImports.length === 0) {
      this.enter = false
      return
    }
    this.programNode = path.node
  }

  programExitVisitor(): void {
    if (!this.enter) return
    this.didAlterImports = false
    this.allImports = []
    this.programNode = undefined
  }

  classEnter(path: NodePath<t.ClassDeclaration>): void {
    if (!this.enter) return
    this.enterClassNode = this.isDLightClass(path)
    if (!this.enterClassNode) return
    this.initNode(path)
    this.resolveMounting(path)
  }

  classExit(): void {
    if (!this.enter) return
    if (!this.enterClassNode) return
    this.transformDLightClass()
    this.clearNode()
    this.enterClassNode = false
  }

  classMethodVisitor(path: NodePath<t.ClassMethod>): void {
    if (!this.enterClassNode) return
    if (!this.t.isIdentifier(path.node.key)) return
    const key = path.node.key.name
    if (key === "View") return

    const isSubView = this.findDecoratorByName(path.node.decorators, "View")
    if (isSubView) return
    const node = path.node

    // ---- Handle watcher
    // ---- Get watcher decorator or watcher function decorator
    // ---- Watcher auto collect deps:
    //       @Watch
    //       watcher() { myFunc() }
    // ---- Watcher function manual set deps:
    //       @Watch(["count", "flag"])
    //       watcherFunc() { myFunc() }
    const watchDeco = this.findDecoratorByName(node.decorators, "Watch")
    if (this.t.isIdentifier(node.key, { name: "constructor" })) return
    this.autoBindMethods(node)
    if (!watchDeco) return

    // ---- Get dependencies from watcher decorator or watcher function decorator
    let deps: string[] = []
    let depsNode
    if (this.t.isIdentifier(watchDeco)) {
      ;[deps, depsNode] = this.getDependencies(node)
    } else {
      const listenDepStrings = watchDeco.arguments
        .filter(arg => this.t.isStringLiteral(arg))
        .map(arg => (arg as t.StringLiteral).value)
      const pseudoMethod = this.t.classMethod(
        "method",
        node.key,
        [],
        this.t.blockStatement([
          this.t.expressionStatement(
            this.t.arrayExpression(
              listenDepStrings.map(str =>
                this.t.memberExpression(
                  this.t.thisExpression(),
                  this.t.identifier(str)
                )
              )
            )
          ),
        ])
      )

      ;[deps, depsNode] = this.getDependencies(pseudoMethod)
    }
    // ---- Register watcher to propertiesContainer
    this.propertiesContainer[key] = {
      node,
      deps,
      depsNode,
      isWatcher: true,
    }
    node.decorators = this.removeDecorators(node.decorators, ["Watch"])
  }

  classPropertyVisitor(path: NodePath<t.ClassProperty>): void {
    if (!this.enterClassNode) return
    const node = path.node
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    if (key === "View") return
    const decorators = node.decorators
    const isSubView = this.findDecoratorByName(decorators, "View")
    if (isSubView) return
    // ---- Parse model
    const isModel = this.parseModel(path)

    const isProp = !!this.findDecoratorByName(decorators, "Prop")
    const isEnv = !!this.findDecoratorByName(decorators, "Env")

    const isChildren = !!this.findDecoratorByName(node.decorators, "Children")

    const [deps, depsNode] = !isChildren ? this.getDependencies(node) : [[]]

    this.propertiesContainer[key] = {
      node,
      deps,
      depsNode,
      isStatic: !!this.findDecoratorByName(decorators, "Static"),
      isContent: !!this.findDecoratorByName(decorators, "Content"),
      isChildren,
      isPropOrEnv: isProp ? "Prop" : isEnv ? "Env" : undefined,
      isModel,
    }

    node.decorators = this.removeDecorators(decorators, availableDecoNames)
  }

  /* ---- Decorator Resolvers ---- */
  /**
   * @brief Decorator resolver: Watcher
   * Add:
   * $wW${key}
   * in watcher:
   * watchxx() {
   *  if (this._$cache(${key}, ${deps})) return
   *  ...
   * }
   * @param node
   */
  resolveWatcherDecorator(
    node: t.ClassMethod,
    depsNode: t.ArrayExpression
  ): void {
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode!.body.indexOf(node)
    const watcherNode = this.t.classProperty(this.t.identifier(`$w$${key}`))
    this.classBodyNode!.body.splice(propertyIdx, 0, watcherNode)
    node.body.body.unshift(
      this.t.ifStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier("_$cache")
          ),
          [this.t.stringLiteral(key), depsNode]
        ),
        this.t.blockStatement([this.t.returnStatement()])
      )
    )
  }

  /**
   * @brief Decorator resolver: Children
   * Add:
   * get ${key}() {
   *  return this._$children
   * }
   * @param node
   */
  resolveChildrenDecorator(node: t.ClassProperty) {
    if (!this.classBodyNode) return
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode.body.indexOf(node)

    const childrenFuncCallNode = this.t.memberExpression(
      this.t.thisExpression(),
      this.t.identifier("_$children")
    )

    const getterNode = this.t.classMethod(
      "get",
      this.t.identifier(key),
      [],
      this.t.blockStatement([this.t.returnStatement(childrenFuncCallNode)])
    )
    this.classBodyNode.body.splice(propertyIdx, 1, getterNode)
  }

  /**
   * @brief Decorator resolver: Content
   * Add:
   * _$contentKey = "key"
   * @param node
   */
  resolveContentDecorator(node: t.ClassProperty) {
    if (!this.classBodyNode) return
    if (!this.t.isIdentifier(node.key)) return

    // ---- Already has _$contentKey
    if (
      this.classBodyNode.body.some(
        n =>
          this.t.isClassProperty(n) &&
          (n.key as t.Identifier).name === "_$contentKey"
      )
    )
      return
    const key = node.key.name
    const propertyIdx = this.classBodyNode.body.indexOf(node)

    const derivedStatusKey = this.t.classProperty(
      this.t.identifier("_$contentKey"),
      this.t.stringLiteral(key)
    )
    this.classBodyNode.body.splice(propertyIdx, 0, derivedStatusKey)
  }

  /**
   * @brief Decorator resolver: Prop/Env
   * Add:
   * $p/e$${key}
   * @param node
   */
  resolvePropDecorator(node: t.ClassProperty, decoratorName: "Prop" | "Env") {
    if (!this.classBodyNode) return
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode.body.indexOf(node)
    const tag = decoratorName.toLowerCase() === "prop" ? "p" : "e"
    const derivedStatusKey = this.t.classProperty(
      this.t.identifier(`$${tag}$${key}`)
    )
    this.classBodyNode.body.splice(propertyIdx, 0, derivedStatusKey)
  }

  /**
   * @brief Decorator resolver: State
   * Add:
   *  $$${key} = ${depIdx}
   *  $sub$${key} = [${reversedDeps}]
   * @param node
   */
  resolveStateDecorator(
    node: t.ClassProperty,
    idx: number,
    reverseDeps: Set<string> | undefined
  ) {
    if (!this.classBodyNode) return
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode.body.indexOf(node)

    const idxNode = !this.dLightModel
      ? [
          this.t.classProperty(
            this.t.identifier(`$$${key}`),
            this.t.numericLiteral(1 << idx)
          ),
        ]
      : []

    const depsNode = reverseDeps
      ? [
          this.t.classProperty(
            this.t.identifier(`$s$${key}`),
            this.t.arrayExpression(
              [...reverseDeps].map(d => this.t.stringLiteral(d))
            )
          ),
        ]
      : []

    this.classBodyNode.body.splice(propertyIdx + 1, 0, ...idxNode, ...depsNode)
  }

  /* ---- Helper Functions ---- */
  handleClassCustomDecorators() {
    if (!this.classBodyNode) return
    const decorators = this.classDeclarationNode?.decorators
    if (!decorators) return
    // ---- Forward Prop
    const forwardPropDeco = this.findDecoratorByName(decorators, "ForwardProps")
    /**
     * _$forwardProp
     * _$forwardPropMap = new Set()
     * _$forwardPropsId = []
     */
    if (forwardPropDeco) {
      this.classBodyNode.body.unshift(
        this.t.classProperty(this.t.identifier("_$forwardProps")),
        this.t.classProperty(
          this.t.identifier("_$forwardPropsSet"),
          this.t.newExpression(this.t.identifier("Set"), [])
        ),
        this.t.classProperty(
          this.t.identifier("_$forwardPropsId"),
          this.t.arrayExpression([])
        )
      )
      this.classDeclarationNode!.decorators = this.removeDecorators(
        decorators,
        ["ForwardProps"]
      )
    }
  }

  /**
   * @brief Transform the whole DLight class when exiting the class
   *  1. Alter all the state properties
   *  2. Transform MainView and SubViews with DLight syntax
   */
  transformDLightClass(): void {
    this.addAutoUpdate(this.availableProperties)
    const usedProperties = this.handleView()
    const propertyArr = Object.entries(this.propertiesContainer).reverse()
    const depReversedMap = this.dependencyMapReversed()

    for (const [
      key,
      {
        node,
        deps,
        isStatic,
        isChildren,
        isPropOrEnv,
        isWatcher,
        isContent,
        isModel,
        depsNode,
      },
    ] of propertyArr) {
      if (isChildren) {
        this.resolveChildrenDecorator(node as t.ClassProperty)
        continue
      }
      if (deps.length > 0) {
        usedProperties.push(...deps)
        if (isWatcher) {
          this.resolveWatcherDecorator(node as t.ClassMethod, depsNode!)
        } else if (!isModel) {
          this.handleDerivedProperty(node as t.ClassProperty, depsNode!)
        }
      }
      if (isPropOrEnv) {
        this.resolvePropDecorator(node as t.ClassProperty, isPropOrEnv)
      }
      if (isContent) {
        this.resolvePropDecorator(node as t.ClassProperty, "Prop")
        this.resolveContentDecorator(node as t.ClassProperty)
      }
      if (isStatic) continue
      if (usedProperties.includes(key)) {
        this.resolveStateDecorator(
          node as t.ClassProperty,
          this.availableProperties.indexOf(key),
          depReversedMap[key]
        )
      }
    }
  }

  /**
   * @brief Add updateProp and updateDerived if there's a assignment
   * @param usedProperties
   * @returns
   */
  private addAutoUpdate(usedProperties: string[]) {
    if (!this.classBodyNode) return
    const nonViewNodes = this.classBodyNode.body.filter(
      n =>
        !(
          ((this.t.isClassProperty(n) || this.t.isClassMethod(n)) &&
            ["constructor", "_$compName"].includes(
              (n.key as t.Identifier).name
            )) ||
          this.t.isClassMethod(n, { static: true }) ||
          this.t.isClassProperty(n, { static: true })
        )
    )
    nonViewNodes.forEach(n => {
      const value = this.t.isClassProperty(n)
        ? n.value
        : this.t.isClassMethod(n)
          ? n.body
          : null
      if (!value) return
      this.addUpdateDerived(value, usedProperties)
    })
  }

  /**
   * @Brief Add updateView and updateDerived to the node
   * @param node
   * @param usedProperties
   */
  private addUpdateDerived(
    node: t.Expression | t.BlockStatement,
    usedProperties: string[]
  ) {
    const newUpdateProp = (node: t.Expression, key: string) =>
      this.t.callExpression(
        this.t.memberExpression(
          this.t.thisExpression(),
          this.t.identifier("_$ud")
        ),
        [node, this.t.stringLiteral(key)]
      )
    this.traverse(this.valueWrapper(node), {
      MemberExpression: path => {
        if (
          !this.t.isThisExpression(path.node.object) ||
          !this.t.isIdentifier(path.node.property)
        )
          return
        const key = path.node.property.name
        if (!usedProperties.includes(key)) return
        const assignPath = this.isAssignmentExpressionLeft(path)
        if (!assignPath) return
        assignPath.replaceWith(
          newUpdateProp(assignPath.node as t.Expression, key)
        )
        assignPath.skip()
      },
      CallExpression: path => {
        if (!this.t.isMemberExpression(path.node.callee)) return
        const funcNameNode = path.node.callee.property
        if (!this.t.isIdentifier(funcNameNode)) return
        if (!reactivityFuncNames.includes(funcNameNode.name)) return
        let callee = path.get("callee").get("object") as NodePath

        while (this.t.isMemberExpression(callee.node)) {
          callee = callee.get("object") as NodePath
        }
        if (!this.t.isThisExpression(callee?.node)) return
        const key = (
          (callee.parentPath!.node as t.MemberExpression)
            .property as t.Identifier
        ).name
        path.replaceWith(newUpdateProp(path.node, key))
        path.skip()
      },
    })
  }

  /* ---- DLight Class View Handlers ---- */
  /**
   * @brief Transform Body and SubViews with DLight syntax
   * @returns used properties
   */
  handleView(): string[] {
    if (!this.classBodyNode) return []
    const usedPropertySet = new Set<string>()
    let mainView: undefined | t.ClassMethod
    const subViewNodes: t.ClassMethod[] = []
    for (let viewNode of this.classBodyNode.body) {
      if (!this.t.isClassProperty(viewNode) && !this.t.isClassMethod(viewNode))
        continue
      if (!this.t.isIdentifier(viewNode.key)) continue
      const isSubView = this.findDecoratorByName(viewNode.decorators, "View")
      const isMainView = viewNode.key.name === "View"
      if (!isSubView && !isMainView) continue

      if (this.t.isClassProperty(viewNode)) {
        // ---- Handle TSAsExpression, e.g. MyView = (() => {}) as Type1 as Type2
        let exp = viewNode.value
        while (this.t.isTSAsExpression(exp)) exp = exp.expression
        if (!this.t.isArrowFunctionExpression(exp)) continue
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
        mainView = viewNode
      }
    }

    const subViewNames = subViewNodes.map(v => (v.key as t.Identifier).name)
    const subViewPropSubDepMap: SubViewPropSubDepMap = Object.fromEntries(
      subViewNodes
        .map(v => {
          const prop = v.params[0]
          if (!prop || !this.t.isObjectPattern(prop)) return ["-", null as any]
          const props = Object.fromEntries(
            prop.properties
              .map(p => {
                if (!this.t.isObjectProperty(p)) return ["-", null]
                const key = (p.key as t.Identifier).name
                // ---- Get identifiers that depend on this prop
                const subDeps = this.getIdentifiers(
                  // ---- Some unimportant value wrapper
                  this.t.assignmentExpression(
                    "=",
                    this.t.objectPattern([
                      this.t.objectProperty(this.t.numericLiteral(0), p.value),
                    ]),
                    this.t.numericLiteral(0)
                  )
                ).filter(v => v !== key)
                return [key, subDeps]
              })
              .filter(([_, props]) => props)
          )
          return [(v.key as t.Identifier).name, props]
        })
        .filter(([_, props]) => props)
    )
    let templateIdx = -1
    if (mainView) {
      let usedProperties
      ;[usedProperties, templateIdx] = this.alterMainView(
        mainView,
        subViewNames,
        subViewPropSubDepMap
      )
      usedProperties.forEach(usedPropertySet.add.bind(usedPropertySet))
    }

    subViewNodes.forEach(viewNode => {
      let usedProperties
      ;[usedProperties, templateIdx] = this.alterSubView(
        viewNode,
        subViewNames,
        subViewPropSubDepMap,
        templateIdx
      )
      usedProperties.forEach(usedPropertySet.add.bind(usedPropertySet))
    })

    const usedProperties: string[] = []
    this.availableProperties.forEach(p => {
      if (usedPropertySet.has(p)) usedProperties.push(p)
    })
    // const usedProperties = usedPropertyDeps.map(dep => dep.slice(1, -4))
    return usedProperties
  }

  /**
   * @brief Transform Views with DLight syntax
   * @param viewNode
   * @param subViewNames
   * @param isSubView
   * @returns Used properties
   */
  alterMainView(
    viewNode: t.ClassMethod,
    subViewNames: string[],
    subViewPropSubDepMap: SubViewPropSubDepMap
  ): [Set<string>, number] {
    const viewUnits = parseView(viewNode.body, {
      babelApi: this.babelApi,
      subviewNames: subViewNames,
      htmlTags: this.htmlTags,
    })

    const [viewParticles, usedPropertySet] = parseReactivity(viewUnits, {
      babelApi: this.babelApi,
      availableProperties: this.availableProperties,
      dependencyMap: this.dependencyMap,
      reactivityFuncNames,
    })

    const [body, classProperties, templateIdx] = generateView(viewParticles, {
      babelApi: this.babelApi,
      className: this.className!,
      importMap,
      subViewPropMap: Object.fromEntries(
        Object.entries(subViewPropSubDepMap).map(([key, props]) => [
          key,
          Object.keys(props),
        ])
      ),
      templateIdx: -1,
      attributeMap: this.attributeMap,
      alterAttributeMap,
    })
    viewNode.body = body
    this.classBodyNode?.body.push(...classProperties)

    return [usedPropertySet, templateIdx]
  }

  /**
   * @brief Transform SubViews with DLight syntax
   * @param viewNode
   * @param subViewNames
   * @param subViewPropSubDepMap
   * @param templateIdx
   * @returns
   */
  alterSubView(
    viewNode: t.ClassMethod,
    subViewNames: string[],
    subViewPropSubDepMap: SubViewPropSubDepMap,
    templateIdx: number
  ): [Set<string>, number] {
    // ---- Add prop => Sub() => Sub(_$, $subviewNode)
    if (viewNode.params.length === 0) {
      viewNode.params.push(
        this.t.identifier("_$"),
        this.t.identifier("$subviewNode")
      )
    } else if (viewNode.params.length === 1) {
      viewNode.params.push(this.t.identifier("$subviewNode"))
    } else {
      viewNode.params[1] = this.t.identifier("$subviewNode")
      viewNode.params.length = 2
    }
    const viewUnits = parseView(viewNode.body, {
      babelApi: this.babelApi,
      subviewNames: subViewNames,
      htmlTags: this.htmlTags,
    })

    const subViewProp =
      subViewPropSubDepMap[(viewNode.key as t.Identifier).name] ?? []
    const identifierDepMap: Record<string, string[]> = {}
    Object.entries(subViewProp).forEach(([key, subDeps]) => {
      subDeps.forEach(dep => {
        identifierDepMap[dep] = [key]
      })
    })

    const [viewParticlesProperty, usedPropertySet] = parseReactivity(
      viewUnits,
      {
        babelApi: this.babelApi,
        availableProperties: this.availableProperties,
        availableIdentifiers: Object.keys(subViewProp),
        dependencyMap: this.dependencyMap,
        dependencyParseType: "property",
        reactivityFuncNames,
      }
    )

    const [viewParticlesIdentifier] = parseReactivity(viewUnits, {
      babelApi: this.babelApi,
      availableProperties: Object.keys(subViewProp),
      dependencyMap: this.dependencyMap,
      dependencyParseType: "identifier",
      identifierDepMap,
      reactivityFuncNames,
    })

    const subViewPropMap = Object.fromEntries(
      Object.entries(subViewPropSubDepMap).map(([key, props]) => [
        key,
        Object.keys(props),
      ])
    )
    const [body, classProperties, newTemplateIdx] = generateSubView(
      viewParticlesProperty,
      viewParticlesIdentifier,
      viewNode.params[0] as t.ObjectPattern,
      {
        babelApi: this.babelApi,
        className: this.className!,
        importMap,
        subViewPropMap,
        templateIdx,
        attributeMap: this.attributeMap,
        alterAttributeMap,
      }
    )
    viewNode.body = body
    this.classBodyNode?.body.push(...classProperties)

    return [usedPropertySet, newTemplateIdx]
  }

  /**
   * @brief Test if the file is allowed to be transformed
   * @param fileName
   * @returns is file allowed
   */
  private fileAllowed(fileName: string | undefined): boolean {
    if (this.includes.includes("*")) return true
    if (!fileName) return false
    if (this.excludes.some(pattern => minimatch(fileName, pattern)))
      return false
    if (!this.includes.some(pattern => minimatch(fileName, pattern)))
      return false
    return true
  }

  /**
   * @brief Test if the class is a dlight view
   * @param path
   * @returns
   */
  private isDLightView(path: NodePath<t.ClassDeclaration>): boolean {
    const node = path.node
    const decorators = node.decorators ?? []
    const isViewDecorator = decorators.find((deco: t.Decorator) =>
      this.t.isIdentifier(deco.expression, { name: "View" })
    )
    if (isViewDecorator) {
      node.superClass = this.t.identifier("View")
      node.decorators = node.decorators?.filter(
        (deco: t.Decorator) =>
          !this.t.isIdentifier(deco.expression, { name: "View" })
      )
    }
    return this.t.isIdentifier(node.superClass, { name: "View" })
  }

  /**
   * @brief Test if the class is a dlight model
   * @param path
   * @returns
   */
  private isDLightModel(path: NodePath<t.ClassDeclaration>): boolean {
    const node = path.node
    const decorators = node.decorators ?? []
    const isModelDecorator = decorators.find((deco: t.Decorator) =>
      this.t.isIdentifier(deco.expression, { name: "Model" })
    )
    if (isModelDecorator) {
      node.superClass = this.t.identifier("Model")
      node.decorators = node.decorators?.filter(
        (deco: t.Decorator) =>
          !this.t.isIdentifier(deco.expression, { name: "Model" })
      )
    }

    // ---- Add property _$model
    node.body.body.unshift(this.t.classProperty(this.t.identifier("_$model")))

    // ---- Delete all views
    node.body.body = node.body.body.filter(
      n =>
        !(
          (this.t.isClassProperty(n) ||
            this.t.isClassMethod(n, { kind: "method" })) &&
          (this.findDecoratorByName(n.decorators, "View") ||
            (this.t.isIdentifier(n.key) && n.key.name === "View"))
        )
    )
    this.dLightModel = true

    return this.t.isIdentifier(node.superClass, { name: "Model" })
  }

  /**
   * @brief Test if the class is a dlight class
   * @param path
   * @returns
   */
  isDLightClass(path: NodePath<t.ClassDeclaration>): boolean {
    return this.isDLightView(path) || this.isDLightModel(path)
  }

  /**
   * @brief Parse any use(Model) inside a property
   * @param path
   * @returns
   */
  private parseModel(path: NodePath<t.ClassProperty>) {
    const hasUseImport = this.allImports.some(
      imp =>
        imp.source.value === this.dlightPackageName &&
        imp.specifiers.some(s => {
          if (
            this.t.isImportSpecifier(s) &&
            this.t.isIdentifier(s.imported, { name: "use" })
          ) {
            return true
          }
        })
    )
    if (!hasUseImport) return
    const node = path.node
    const key = node.key
    if (!this.t.isIdentifier(key)) return
    const value = node.value
    if (!this.t.isCallExpression(value)) return
    if (!this.t.isIdentifier(value.callee, { name: "use" })) return
    const args = value.arguments
    const propsArg = args[1]
    const contentArg = args[2]
    let propsNode: t.Expression = this.t.nullLiteral()
    if (propsArg) {
      const mergedPropsNode: [
        t.Expression,
        t.ArrayExpression | t.NullLiteral,
      ][] = []
      const spreadPropsNode: [
        t.Expression,
        t.Expression,
        t.ArrayExpression | t.NullLiteral,
      ][] = []
      // ---- Get props deps
      if (this.t.isObjectExpression(propsArg)) {
        propsArg.properties.forEach(prop => {
          if (this.t.isSpreadElement(prop)) {
            const [, depsNode] = this.getDependenciesFromNode(
              prop.argument as t.Expression
            )
            mergedPropsNode.push([
              prop.argument as t.Expression,
              depsNode ?? this.t.nullLiteral(),
            ])
          } else if (this.t.isObjectProperty(prop)) {
            const [, depsNode] = this.getDependenciesFromNode(
              prop.value as t.Expression
            )
            spreadPropsNode.push([
              !prop.computed && this.t.isIdentifier(prop.key)
                ? this.t.stringLiteral(prop.key.name)
                : (prop.key as t.Expression),
              prop.value as t.Expression,
              depsNode ?? this.t.nullLiteral(),
            ])
          } else {
            spreadPropsNode.push([
              !prop.computed && this.t.isIdentifier(prop.key)
                ? this.t.stringLiteral(prop.key.name)
                : (prop.key as t.Expression),
              this.t.arrowFunctionExpression([], prop.body),
              this.t.nullLiteral(),
            ])
          }
        })
      } else {
        const [, depsNode] = this.getDependenciesFromNode(
          propsArg as t.Expression
        )
        mergedPropsNode.push([
          propsArg as t.Expression,
          depsNode ?? this.t.nullLiteral(),
        ])
      }
      /**
       * @View { ok: this.count, ...this.props }
       * {
       *  m: [[this.props, []]]
       *  s: [["ok", this.count, [this.count]]]
       * }
       */
      propsNode = this.t.objectExpression([
        this.t.objectProperty(
          this.t.identifier("m"),
          this.t.arrayExpression(
            mergedPropsNode.map(n => this.t.arrayExpression(n))
          )
        ),
        this.t.objectProperty(
          this.t.identifier("s"),
          this.t.arrayExpression(
            spreadPropsNode.map(n => this.t.arrayExpression(n))
          )
        ),
      ])
    }

    let contentNode: t.Expression = this.t.nullLiteral()
    if (contentArg) {
      const [, depsNode] = this.getDependenciesFromNode(
        contentArg as t.Expression
      )
      contentNode = this.t.arrayExpression([
        contentArg as t.Expression,
        depsNode ?? this.t.nullLiteral(),
      ])
    }
    args[1] = this.t.arrowFunctionExpression([], propsNode)
    args[2] = this.t.arrowFunctionExpression([], contentNode)
    args[3] = this.t.stringLiteral(key.name)
    value.callee = this.t.memberExpression(
      this.t.thisExpression(),
      this.t.identifier("_$injectModel")
    )
    // ---- Wrap a function for lazy evaluation
    node.value = this.t.arrowFunctionExpression([], value)
    // ---- Add $md$${key}
    const propertyIdx = this.classBodyNode!.body.indexOf(node)
    const modelDecorator = this.t.classProperty(
      this.t.identifier(`$md$${key.name}`)
    )
    this.classBodyNode!.body.splice(propertyIdx, 0, modelDecorator)
    return true
  }

  /**
   * @brief Remove decorators by name
   *  Only search for Identifier and CallExpression, e.g, @Ok, @Ok()
   * @param decorators
   * @param names
   * @returns new decorators
   */
  private removeDecorators(
    decorators: t.Decorator[] | undefined | null,
    names: string[]
  ): t.Decorator[] {
    if (!decorators) return []
    return decorators.filter(
      d =>
        !(
          (this.t.isIdentifier(d.expression) &&
            names.includes(d.expression.name)) ||
          (this.t.isCallExpression(d.expression) &&
            this.t.isIdentifier(d.expression.callee) &&
            names.includes(d.expression.callee.name))
        )
    )
  }

  /**
   * @brief Find decorator by name,
   *  Only search for Identifier and CallExpression, e.g, @Ok, @Ok()
   * @param decorators
   * @param name
   * @returns Identifier or CallExpression or nothing
   */
  private findDecoratorByName(
    decorators: t.Decorator[] | undefined | null,
    name: string
  ): t.Identifier | t.CallExpression | undefined {
    if (!decorators) return
    return decorators.find(
      deco =>
        this.t.isIdentifier(deco.expression, { name }) ||
        (this.t.isCallExpression(deco.expression) &&
          this.t.isIdentifier(deco.expression.callee, { name }))
    )?.expression as t.Identifier | t.CallExpression | undefined
  }

  /**
   * @brief Generate a dependency node from a dependency identifier,
   *  loop until the parent node is not a binary expression or a member expression
   * @param path
   * @returns
   */
  private geneDependencyNode(path: NodePath): t.Expression {
    let parentPath = path
    while (parentPath?.parentPath) {
      const pParentPath = parentPath.parentPath
      if (
        !(
          this.t.isBinaryExpression(pParentPath.node) ||
          this.t.isMemberExpression(pParentPath.node)
        )
      ) {
        return parentPath.node as t.Expression
      }
      parentPath = pParentPath
    }
    return path.node as t.Expression
  }

  /**
   * constructor() {
   *  super()
   * }
   */
  private addConstructor(): t.ClassMethod {
    let constructor = this.classBodyNode!.body.find(n =>
      this.t.isClassMethod(n, { kind: "constructor" })
    ) as t.ClassMethod
    if (constructor) return constructor

    constructor = this.t.classMethod(
      "constructor",
      this.t.identifier("constructor"),
      [],
      this.t.blockStatement([
        this.t.expressionStatement(this.t.callExpression(this.t.super(), [])),
      ])
    )

    this.classBodyNode!.body.unshift(constructor)
    return constructor
  }

  private autoBindMethods(node: t.ClassMethod) {
    const constructorNode = this.addConstructor()
    constructorNode.body.body.push(
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(this.t.thisExpression(), node.key),
          this.t.callExpression(
            this.t.memberExpression(
              this.t.memberExpression(this.t.thisExpression(), node.key),
              this.t.identifier("bind")
            ),
            [this.t.thisExpression()]
          )
        )
      )
    )
  }

  /**
   * ${key}
   * get $f$${key}() {
   *  if (this._$cache(${key}, ${deps})) return this.${key}
   *  return ${value}
   * }
   */
  private handleDerivedProperty(
    node: t.ClassProperty,
    depsNode: t.ArrayExpression
  ) {
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    const value = node.value
    const propertyIdx = this.classBodyNode!.body.indexOf(node)
    const getterNode = this.t.classMethod(
      "get",
      this.t.identifier(`$f$${key}`),
      [],
      this.t.blockStatement([
        this.t.ifStatement(
          this.t.callExpression(
            this.t.memberExpression(
              this.t.thisExpression(),
              this.t.identifier("_$cache")
            ),
            [this.t.stringLiteral(key), depsNode]
          ),
          this.t.blockStatement([
            this.t.returnStatement(
              this.t.memberExpression(
                this.t.thisExpression(),
                this.t.identifier(key)
              )
            ),
          ])
        ),
        this.t.returnStatement(value),
      ])
    )
    this.classBodyNode!.body.splice(propertyIdx + 1, 0, getterNode)
    node.value = null
  }

  private getDependenciesFromNode(
    node: t.Expression | t.ClassDeclaration,
    isClassLevel = false
  ): [string[], t.ArrayExpression | undefined] {
    // ---- Deps: console.log(this.count)
    const deps = new Set<string>()
    // ---- Assign deps: this.count = 1 / this.count++
    const assignDeps = new Set<string>()
    const depNodes: Record<string, t.Expression[]> = {}

    this.traverse(this.valueWrapper(node), {
      MemberExpression: innerPath => {
        if (
          !this.t.isIdentifier(innerPath.node.property) ||
          !this.t.isThisExpression(innerPath.node.object)
        )
          return

        const propertyKey = innerPath.node.property.name
        if (
          this.isAssignmentExpressionLeft(innerPath) ||
          this.isAssignmentFunction(innerPath)
        ) {
          assignDeps.add(propertyKey)
        } else if (
          this.availableProperties.includes(propertyKey) &&
          !this.isMemberInEscapeFunction(
            innerPath,
            this.classDeclarationNode!
          ) &&
          !this.isMemberInManualFunction(innerPath, this.classDeclarationNode!)
        ) {
          deps.add(propertyKey)
          if (isClassLevel)
            this.dependencyMap[propertyKey]?.forEach(deps.add.bind(deps))
          if (!depNodes[propertyKey]) depNodes[propertyKey] = []
          depNodes[propertyKey].push(this.geneDependencyNode(innerPath))
        }
      },
    })

    // ---- Eliminate deps that are assigned in the same method
    //      e.g. { console.log(this.count); this.count = 1 }
    //      this will cause infinite loop
    //      so we eliminate "count" from deps
    assignDeps.forEach(dep => {
      deps.delete(dep)
      delete depNodes[dep]
    })

    let dependencyNodes = Object.values(depNodes).flat()
    // ---- deduplicate the dependency nodes
    dependencyNodes = dependencyNodes.filter((n, i) => {
      const idx = dependencyNodes.findIndex(m => this.t.isNodesEquivalent(m, n))
      return idx === i
    })

    // ---- Add deps to dependencyMap
    const depArr = [...deps]
    if (isClassLevel && deps.size > 0) {
      const propertyKey = (
        ((node as t.ClassDeclaration).body.body[0] as t.ClassMethod)
          .key as t.Identifier
      ).name
      this.dependencyMap[propertyKey] = depArr
    }

    return [depArr, this.t.arrayExpression(dependencyNodes)]
  }
  /**
   * @brief Get all valid dependencies of a babel path
   * @param path
   * @returns dependencies
   */
  private getDependencies(
    node: t.ClassMethod | t.ClassProperty
  ): [string[], t.ArrayExpression | undefined] {
    if (!this.t.isIdentifier(node.key)) return [[], undefined]
    const wrappedNode = this.t.classDeclaration(
      null,
      null,
      this.t.classBody([node])
    )
    return this.getDependenciesFromNode(wrappedNode, true)
  }

  private dependencyMapReversed() {
    const reversedMap: Record<string, Set<string>> = {}
    Object.entries(this.dependencyMap).forEach(([key, deps]) => {
      deps.forEach(dep => {
        if (!reversedMap[dep]) reversedMap[dep] = new Set()
        reversedMap[dep].add(key)
      })
    })

    return reversedMap
  }

  private resolveMounting(path: NodePath<t.ClassDeclaration>) {
    const node = path.node
    if (!this.t.isIdentifier(node.id)) return
    const decorators = node.decorators ?? []
    const findEntry = (name: string) => {
      const found = decorators.find(deco =>
        this.t.isIdentifier(deco.expression, { name })
      )
      if (found)
        decorators.splice(
          decorators.findIndex(deco => deco === found),
          1
        )
      return found
    }

    // ---- Find "@Main" for mounting "main", "@App" for mounting "app"
    const entryValue = findEntry("Main")
      ? "main"
      : findEntry("App")
        ? "app"
        : null
    let mountNode: t.Expression
    if (entryValue) {
      mountNode = this.t.stringLiteral(entryValue)
    } else {
      // ---- Find "@Mount("any-id")"
      const mounting = decorators.find(
        deco =>
          this.t.isCallExpression(deco.expression) &&
          this.t.isIdentifier(deco.expression.callee, { name: "Mount" }) &&
          deco.expression.arguments.length === 1
      ) as t.Decorator
      if (!mounting) return
      decorators.splice(
        decorators.findIndex(deco => deco === mounting),
        1
      )
      mountNode = (mounting.expression as t.CallExpression)
        .arguments[0] as t.Expression
    }

    // ---- ${importMap.render}("main", ${node.id})
    const parentNode = path.parentPath.node
    if (!this.t.isBlockStatement(parentNode) && !this.t.isProgram(parentNode))
      return
    const idx = parentNode.body.indexOf(node)
    parentNode.body.splice(
      idx + 1,
      0,
      this.t.expressionStatement(
        this.t.callExpression(this.t.identifier(importMap.render), [
          mountNode,
          node.id as t.Identifier,
        ])
      )
    )
  }

  /**
   * @brief Transform arrow function property to method
   * @param propertyNode
   * @returns new method node
   */
  arrowFunctionPropertyToMethod(
    propertyNode: t.ClassProperty
  ): t.ClassMethod | undefined {
    if (!this.t.isArrowFunctionExpression(propertyNode.value)) return
    const value = propertyNode.value
    if (!this.t.isBlockStatement(value.body)) return
    // ---- Remove property
    const propertyIdx = this.classBodyNode!.body.indexOf(propertyNode)
    // ---- Add method
    const methodNode = this.t.classMethod(
      "method",
      propertyNode.key,
      value.params,
      value.body
    )
    this.classBodyNode!.body.splice(propertyIdx, 1, methodNode)

    return methodNode
  }

  /**
   * @brief Check if a member expression is a property of a member expression
   * @param parentNode
   * @param currentNode
   * @returns is a property of a member expression
   */
  isMemberExpressionProperty(parentNode: t.Node, currentNode: t.Node): boolean {
    return (
      this.t.isMemberExpression(parentNode) &&
      !parentNode.computed &&
      parentNode.property === currentNode
    )
  }

  /**
   * @brief Check if a member expression is a key of an object
   * @param parentNode
   * @param currentNode
   * @returns is a key of an object
   */
  isObjectKey(parentNode: t.Node, currentNode: t.Node): boolean {
    return this.t.isObjectProperty(parentNode) && parentNode.key === currentNode
  }

  /**
   * @brief Add arrow function to property value
   * @param node
   */
  valueWithArrowFunc(node: t.ClassProperty): void {
    if (!node.value) {
      node.value = this.t.identifier("undefined")
    }
    node.value = this.t.arrowFunctionExpression([], node.value)
  }

  /**
   * @brief Get all top level return statements in a block statement,
   *  ignore nested function returns
   * @param node
   * @returns
   */
  getAllTopLevelReturnBlock(node: t.BlockStatement): t.BlockStatement[] {
    const returns: t.BlockStatement[] = []

    let inNestedFunction = false
    this.traverse(this.valueWrapper(node), {
      Function: path => {
        if (inNestedFunction) return
        inNestedFunction = true
        path.skip()
      },
      ReturnStatement: path => {
        if (inNestedFunction) return
        const parentNode = path.parentPath.node
        if (!this.t.isBlockStatement(parentNode)) {
          const newNode = this.t.blockStatement([path.node])
          path.replaceWith(newNode)
          returns.push(newNode)
        } else {
          returns.push(parentNode)
        }
        path.skip()
      },
      exit: path => {
        if (this.t.isFunction(path.node)) inNestedFunction = false
      },
    })

    return returns
  }

  /**
   * @brief Wrap the value in a file
   * @param node
   * @returns wrapped value
   */
  private valueWrapper(node: t.Expression | t.Statement): t.File {
    return this.t.file(
      this.t.program([
        this.t.isStatement(node) ? node : this.t.expressionStatement(node),
      ])
    )
  }

  /**
   * @brief check if the identifier is from a function param till the stopNode
   *  e.g:
   *  function myFunc1(ok) { // stopNode = functionBody
   *     const myFunc2 = ok => ok // from function param
   *     console.log(ok) // not from function param
   *  }
   * @param path
   * @param idName
   */
  private isAttrFromFunction(path: NodePath, idName: string) {
    let reversePath = path.parentPath

    const checkParam: (param: t.Node) => boolean = (param: t.Node) => {
      // ---- 3 general types:
      //      * represent allow nesting
      // ---0 Identifier: (a)
      // ---1 RestElement: (...a)   *
      // ---1 Pattern: 3 sub Pattern
      // -----0   AssignmentPattern: (a=1)   *
      // -----1   ArrayPattern: ([a, b])   *
      // -----2   ObjectPattern: ({a, b})
      if (this.t.isIdentifier(param)) return param.name === idName
      if (this.t.isAssignmentPattern(param)) return checkParam(param.left)
      if (this.t.isArrayPattern(param)) {
        return param.elements
          .filter(Boolean)
          .map(el => checkParam(el!))
          .includes(true)
      }
      if (this.t.isObjectPattern(param)) {
        return (
          param.properties.filter(
            prop =>
              this.t.isObjectProperty(prop) && this.t.isIdentifier(prop.key)
          ) as t.ObjectProperty[]
        )
          .map(prop => (prop.key as t.Identifier).name)
          .includes(idName)
      }
      if (this.t.isRestElement(param)) return checkParam(param.argument)

      return false
    }

    while (reversePath) {
      const node = reversePath.node
      if (
        this.t.isArrowFunctionExpression(node) ||
        this.t.isFunctionDeclaration(node)
      ) {
        for (const param of node.params) {
          if (checkParam(param)) return true
        }
      }
      reversePath = reversePath.parentPath
    }

    return false
  }

  /**
   * @brief Check if an identifier is a simple identifier, i.e., not a member expression, or a function param
   * @param path
   *  1. not a member expression
   *  2. not a function param
   *  3. not in a declaration
   *  4. not as object property's not computed key
   */
  private isStandAloneIdentifier(path: NodePath<t.Identifier>) {
    const node = path.node
    const parentNode = path.parentPath?.node
    const isMemberExpression =
      this.t.isMemberExpression(parentNode) && parentNode.property === node
    if (isMemberExpression) return false
    const isFunctionParam = this.isAttrFromFunction(path, node.name)
    if (isFunctionParam) return false
    while (path.parentPath) {
      if (this.t.isVariableDeclarator(path.parentPath.node)) return false
      if (
        this.t.isObjectProperty(path.parentPath.node) &&
        path.parentPath.node.key === path.node &&
        !path.parentPath.node.computed
      )
        return false
      path = path.parentPath as any
    }
    return true
  }

  /**
   * @brief Get all identifiers as strings in a node
   * @param node
   * @returns identifiers
   */
  private getIdentifiers(node: t.Node): string[] {
    if (this.t.isIdentifier(node)) return [node.name]
    const identifierKeys = new Set<string>()
    this.traverse(this.valueWrapper(node as any), {
      Identifier: innerPath => {
        if (!this.isStandAloneIdentifier(innerPath)) return
        identifierKeys.add(innerPath.node.name)
      },
    })
    return [...identifierKeys]
  }

  static escapeNamings = ["escape", "$"]

  /**
   * @brief Check if it's the left side of an assignment expression, e.g. this.count = 1
   * @param innerPath
   * @returns assignment expression
   */
  isAssignmentExpressionLeft(innerPath: NodePath): NodePath | null {
    let parentPath = innerPath.parentPath
    while (parentPath && !this.t.isStatement(parentPath.node)) {
      if (this.t.isAssignmentExpression(parentPath.node)) {
        if (parentPath.node.left === innerPath.node) return parentPath
        const leftPath = parentPath.get("left") as NodePath
        if (innerPath.isDescendant(leftPath)) return parentPath
      } else if (this.t.isUpdateExpression(parentPath.node)) {
        return parentPath
      }
      parentPath = parentPath.parentPath
    }

    return null
  }

  /**
   * @brief Check if it's a reactivity function, e.g. arr.push
   * @param innerPath
   * @returns
   */
  isAssignmentFunction(innerPath: NodePath): boolean {
    let parentPath = innerPath.parentPath

    while (parentPath && this.t.isMemberExpression(parentPath.node)) {
      parentPath = parentPath.parentPath
    }
    if (!parentPath) return false
    return (
      this.t.isCallExpression(parentPath.node) &&
      this.t.isMemberExpression(parentPath.node.callee) &&
      this.t.isIdentifier(parentPath.node.callee.property) &&
      reactivityFuncNames.includes(parentPath.node.callee.property.name)
    )
  }

  /**
   * @brief Check if it's in an "escape" function,
   *        e.g. escape(() => { console.log(this.count) })
   *              deps will be empty instead of ["count"]
   * @param innerPath
   * @param classDeclarationNode
   * @returns is in escape function
   */
  isMemberInEscapeFunction(innerPath: NodePath, stopNode: t.Node): boolean {
    let isInFunction = false
    let reversePath = innerPath.parentPath
    while (reversePath && reversePath.node !== stopNode) {
      const node = reversePath.node
      if (
        this.t.isCallExpression(node) &&
        this.t.isIdentifier(node.callee) &&
        PluginProvider.escapeNamings.includes(node.callee.name)
      ) {
        isInFunction = true
        break
      }
      reversePath = reversePath.parentPath
    }
    return isInFunction
  }

  /**
   * @brief Check if it's in a "manual" function,
   *        e.g. manual(() => { console.log(this.count) }, ["flag"])
   *             deps will be ["flag"] instead of ["count"]
   * @param innerPath
   * @param classDeclarationNode
   * @returns is in manual function
   */
  isMemberInManualFunction(innerPath: NodePath, stopNode: t.Node): boolean {
    let isInFunction = false
    let reversePath = innerPath.parentPath
    while (reversePath && reversePath.node !== stopNode) {
      const node = reversePath.node
      const parentNode = reversePath.parentPath?.node
      const isFunction =
        this.t.isFunctionExpression(node) ||
        this.t.isArrowFunctionExpression(node)
      const isManual =
        this.t.isCallExpression(parentNode) &&
        this.t.isIdentifier(parentNode.callee) &&
        parentNode.callee.name === "manual"
      if (isFunction && isManual) {
        isInFunction = true
        break
      }
      reversePath = reversePath.parentPath
    }

    return isInFunction
  }

  /**
   * @brief Generate a random string
   * @param length
   * @returns random string
   */
  private static uid(length = 4): string {
    return Math.random()
      .toString(32)
      .slice(2, length + 2)
  }
}

/**
 * @brief Change the PluginProvider class for class inheritance
 */
export let PluginProviderClass = PluginProvider
export function changePluginProviderClass(cls: typeof PluginProvider) {
  PluginProviderClass = cls
}
