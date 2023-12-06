import { type types as t, type NodePath } from "@babel/core"
import { type PropertyContainer, type HTMLTags, type IdentifierToDepNode } from "./types"
import { minimatch } from "minimatch"
import { parseView } from "./viewParser"
import { isAssignmentExpressionLeft, isAssignmentExpressionRight, isMemberInEscapeFunction, isMemberInManualFunction } from "./utils/depChecker"
import { generateView } from "./viewGenerator"
import { uid } from "./utils/utils"

const devMode = process.env.NODE_ENV !== "production"

export class PluginProvider {
  // ---- Const Level
  private readonly defaultHTMLTags = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "menu", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "acronym", "applet", "basefont", "bgsound", "big", "blink", "center", "dir", "font", "frame", "frameset", "isindex", "keygen", "listing", "marquee", "menuitem", "multicol", "nextid", "nobr", "noembed", "noframes", "param", "plaintext", "rb", "rtc", "spacer", "strike", "tt", "xmp", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "svg", "switch", "symbol", "text", "textPath", "tspan", "use", "view"]
  private readonly availableDecoNames = ["Static", "Prop", "Env", "Content", "Children"]
  private readonly dlightDefaultImportName = "@dlightjs/dlight"
  private readonly dlightImportName = this.dlightDefaultImportName

  // ---- Plugin Level
  private readonly t: typeof t
  private readonly enableDevTools: boolean
  private readonly includes: string[]
  private readonly excludes: string[]
  private readonly htmlTags: string[]

  constructor(
    types: typeof t,
    includes: string[],
    excludes: string[],
    enableDevTools: boolean,
    htmlTags: HTMLTags
  ) {
    this.t = types
    this.includes = includes
    this.excludes = excludes
    this.enableDevTools = devMode && enableDevTools
    this.htmlTags = typeof htmlTags === "function"
      ? htmlTags(this.defaultHTMLTags)
      : htmlTags.includes("*")
        ? [...new Set([...this.defaultHTMLTags, ...htmlTags])].filter(tag => tag !== "*")
        : htmlTags
  }

  // ---- DLight class Level
  private classRootPath?: NodePath<t.ClassDeclaration | t.ClassExpression>
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

  private get availableProperties(): string[] {
    return Object.entries(this.propertiesContainer)
      .filter(([key, { isWatcher, isStatic, isChildren }]) => (
        key !== "_$compName" &&
        !isWatcher &&
        !isStatic &&
        !isChildren
      ))
      .map(([key]) => key)
  }

  /**
   * @brief Initialize DLight Node Level variables when entering a class
   * @param path
   */
  initNode(path: NodePath<t.ClassDeclaration | t.ClassExpression>): void {
    this.classRootPath = path
    const node: t.ClassDeclaration | t.ClassExpression = path.node
    this.classDeclarationNode = node
    this.classBodyNode = node.body
    this.derivedPairNode = this.t.classProperty(
      this.t.identifier("_$derivedPairs"),
      this.t.objectExpression([])
    )
    this.propertiesContainer = {}
    // ---- If devtools is enabled, add _$compName property to the class
    if (this.enableDevTools) {
      this.classBodyNode.body.unshift(
        this.t.classProperty(
          this.t.identifier("_$compName"),
          this.t.stringLiteral(node.id?.name ?? `Anonymous_${uid()}`)
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
          this.t.isImportDefaultSpecifier(s) &&
          s.local.name === "DLight"
        ))
      ))
      if (!alreadyImported && this.programNode) {
        // ---- Add a new default import to the head of file
        this.programNode.body.unshift(
          this.t.importDeclaration(
            [this.t.importDefaultSpecifier(this.t.identifier("DLight"))],
            this.t.stringLiteral(this.dlightImportName)
          )
        )
      }
      this.didAlterImports = true
    }
  }

  /**
   * @brief Transform the whole DLight class when exiting the class
   *  1. Alter all the state properties
   *  2. Transform Body and SubViews with DLight syntax
   */
  transformDLightClass(): void {
    const usedProperties = this.handleView()
    const propertyArr = Object.entries(this.propertiesContainer).reverse()

    for (const [key, { node, deps, isStatic, isChildren, isPropOrEnv, isWatcher, isContent }] of propertyArr) {
      if (isChildren) {
        this.resolveChildrenDecorator(node as t.ClassProperty, isChildren)
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
  /**
   * @brief Transform Body and SubViews with DLight syntax
   * @returns used properties
   */
  handleView(): string[] {
    if (!this.classBodyNode) return []
    const usedProperties: string[] = []
    let body: undefined | t.ClassMethod
    const subViewNodes: t.ClassMethod[] = []
    for (let viewNode of this.classBodyNode.body) {
      if (!this.t.isClassProperty(viewNode) && !this.t.isClassMethod(viewNode)) continue
      if (!this.t.isIdentifier(viewNode.key)) continue
      const isSubView = this.findDecoratorByName(viewNode.decorators, "View")
      const isBody = viewNode.key.name === "Body"
      if (!isSubView && !isBody) continue

      if (this.t.isClassProperty(viewNode)) {
        // ---- Handle TSAsExpression, e.g. MyView = (() => {}) as Type1 as Type2
        let exp = viewNode.value
        while (this.t.isTSAsExpression(exp)) exp = exp.expression
        if (!this.t.isArrowFunctionExpression(viewNode.value)) continue
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
      usedProperties.push(...this.alterView(viewNode, subViewNames, true))
    })

    body && usedProperties.push(...this.alterView(body, subViewNames))

    return usedProperties
  }

  /**
   * @brief Turn Subview's props into { value, deps } object
   * @param view
   */
  alterSubViewProps(view: t.ClassMethod): void {
    const param = view.params[0]
    // ---- SubView only accept one object parameter, e.g. MyView({ count, flag }) {}
    if (!param || !this.t.isObjectPattern(param)) return

    const propNames = new Set<string>()
    for (const property of param.properties) {
      if (this.t.isRestElement(property)) continue
      if (!this.t.isIdentifier(property.key)) continue
      propNames.add(property.key.name)
      // ---- When the prop is assigned a default value, e.g. { a = 1 },
      //      turn this prop into a standard dlight subview prop,
      //      e.g. { a: { value: 1, deps: [] } }
      if (this.t.isAssignmentPattern(property.value)) {
        property.value.right = this.t.objectExpression([
          this.t.objectProperty(
            this.t.identifier("value"),
            property.value.right
          ),
          this.t.objectProperty(
            this.t.identifier("deps"),
            this.t.arrayExpression()
          )
        ])
      }
    }
    // ---- Traverse all identifiers in the subview and replace them with .value,
    //      e.g. count => count.value
    // ---- Because we cannot traverse BlockStatement directly,
    //      and we cannot traverse this method with parameters(we need to keep the parameters),
    //      so we wrap the method with a function and traverse the function
    this.classRootPath!.scope.traverse(
      this.t.functionDeclaration(null, [], view.body),
      {
        Identifier: innerPath => {
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
            this.t.optionalMemberExpression(
              this.t.identifier(currentNode.name),
              this.t.identifier("value"),
              false,
              true
            )
          )
          innerPath.skip()
        }
      })
  }

  /**
   * @brief Transform Views with DLight syntax
   * @param viewNode
   * @param subViewNames
   * @param isSubView
   * @returns Used properties
   */
  alterView(viewNode: t.ClassMethod, subViewNames: string[], isSubView = false): string[] {
    let identifierToDepsMap: Record<string, IdentifierToDepNode[]> = {}
    if (isSubView && this.t.isObjectPattern(viewNode.params[0])) {
      // ---- If it's a subview, the first parameter is an object,
      //      we need have a map of these object prop identifiers to dependencies
      const propNames: string[] = viewNode.params[0].properties
        .filter(p => this.t.isObjectProperty(p) && this.t.isIdentifier(p.key))
        .map(p => ((p as t.ObjectProperty).key as t.Identifier).name)
      identifierToDepsMap = propNames.reduce<Record<string, IdentifierToDepNode[]>>((acc, propName) => {
        // ---- ...(${propName}?.deps ?? [])
        acc[propName] = [
          this.t.arrayExpression([
            this.t.spreadElement(
              this.t.logicalExpression(
                "??",
                this.t.optionalMemberExpression(
                  this.t.identifier(propName),
                  this.t.identifier("deps"),
                  false,
                  true
                ),
                this.t.arrayExpression()
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
      this.t,
      parseView(this.t, this.classRootPath!, viewStatements, this.htmlTags),
      this.classRootPath!,
      this.fullDepMap,
      this.availableProperties,
      subViewNames,
      identifierToDepsMap
    )
    viewNode.body = code

    return usedProperties
  }

  /**
   * @brief Add a key-value pair to _$derivedPairs
   * @param name
   * @param deps
   */
  pushDerivedPair(name: string, deps: string[]): void {
    if (!this.classBodyNode) return
    if (!this.derivedPairNode) return
    (this.derivedPairNode.value as t.ObjectExpression).properties.unshift(
      this.t.objectProperty(
        this.t.identifier(name),
        this.t.arrayExpression(deps.map(dep => this.t.stringLiteral(dep)))
      )
    )
    if (!this.classBodyNode.body.includes(this.derivedPairNode)) {
      this.classBodyNode.body.unshift(this.derivedPairNode)
    }
  }

  /* ---- Babel Visitors ---- */
  private visitProgram(_path: NodePath<t.Program>): void {}
  programVisitor(path: NodePath<t.Program>, filename: string | undefined): void {
    this.enter = this.fileAllowed(filename)
    if (!this.enter) return
    this.allImports = path.node.body.filter(n => this.t.isImportDeclaration(n)) as t.ImportDeclaration[]
    const dlightImports = this.allImports.filter(n => n.source.value === this.dlightDefaultImportName)
    if (dlightImports.length === 0) {
      this.enter = false
      return
    }
    this.programNode = path.node
    this.visitProgram(path)
  }

  private enterClass(_path: NodePath<t.ClassDeclaration | t.ClassExpression>): void {}
  classEnter(path: NodePath<t.ClassDeclaration | t.ClassExpression>): void {
    if (!this.enter) return
    if (!this.isDLightView(path)) return
    this.initNode(path)
    this.enterClass(path)
  }

  private exitClass(_path: NodePath<t.ClassDeclaration | t.ClassExpression>): void {}
  classExit(path: NodePath<t.ClassDeclaration | t.ClassExpression>): void {
    if (!this.enter) return
    if (!this.isDLightView(path)) return
    this.transformDLightClass()
    this.exitClass(path)
    this.clearNode()
  }

  private visitClassMethod(_path: NodePath<t.ClassMethod>): void {}
  classMethodVisitor(path: NodePath<t.ClassMethod>): void {
    if (!this.enter) return
    if (!this.t.isIdentifier(path.node.key)) return
    const node: t.ClassMethod = path.node
    const key = (node.key as t.Identifier).name
    if (key === "Body") return
    this.bindMethod(key)
    const isSubView = this.findDecoratorByName(node.decorators, "SubView")
    if (isSubView) return

    // ---- Handle watcher
    // ---- Get watcher decorator or watcher function decorator
    // ---- Watcher auto collect deps:
    //       @Watch
    //       watcher() { myFunc() }
    // ---- Watcher function manual set deps:
    //       @Watch(["count", "flag"])
    //       watcherFunc() { myFunc() }
    const watchDeco = this.findDecoratorByName(node.decorators, "Watch")
    if (!watchDeco) return
    // ---- Get dependencies from watcher decorator or watcher function decorator
    let deps: string[] = []
    if (this.t.isIdentifier(watchDeco)) {
      deps = this.getDependencies(path)
    } else {
      const listenDeps = watchDeco.arguments[0]
      if (this.t.isArrayExpression(listenDeps)) {
        deps = listenDeps.elements
          .filter(arg => this.t.isStringLiteral(arg))
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
    node.decorators = this.removeDecorators(node.decorators, ["Watch"])

    this.visitClassMethod(path)
  }

  private visitClassProperty(_path: NodePath<t.ClassProperty>): void {}
  classPropertyVisitor(path: NodePath<t.ClassProperty>): void {
    if (!this.enter) return
    const node = path.node
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    if (key === "Body") return
    const decorators = node.decorators
    const isSubView = this.findDecoratorByName(decorators, "SubView")
    if (isSubView) return
    const isProp = !!this.findDecoratorByName(decorators, "Prop")
    const isEnv = !!this.findDecoratorByName(decorators, "Env")

    const childrenDeco = this.findDecoratorByName(node.decorators, "Children")
    let isChildren: boolean | number = false
    if (childrenDeco) {
      if (
        this.t.isIdentifier(childrenDeco) ||
        !this.t.isNumericLiteral(childrenDeco.arguments[0])
      ) {
        isChildren = true
      } else {
        // ---- Avoid childrenNum = 0
        isChildren = childrenDeco.arguments[0].value + 1
      }
    }

    const deps = !isChildren
      ? this.getDependencies(path)
      : []

    this.propertiesContainer[key] = {
      node,
      deps,
      isStatic: !!this.findDecoratorByName(decorators, "Static"),
      isContent: !!this.findDecoratorByName(decorators, "Content"),
      isChildren,
      isPropOrEnv: isProp ? "Prop" : (isEnv ? "Env" : undefined)
    }

    node.decorators = this.removeDecorators(decorators, this.availableDecoNames)
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
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode.body.indexOf(node)
    const watcherNode = this.t.classProperty(
      this.t.identifier(`_$$${key}`),
      this.t.stringLiteral("Watcher")
    )
    this.classBodyNode.body.splice(propertyIdx, 0, watcherNode)
  }

  /**
   * @brief Decorator resolver: Children
   * Add:
   * get ${propertyName}() {
   *  return this._$childrenFuncs()[n]
   * }
   * @param node
   */
  resolveChildrenDecorator(node: t.ClassProperty, childNum: true | number) {
    if (!this.classBodyNode) return
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode.body.indexOf(node)

    const childrenFuncCallNode = (
      this.t.callExpression(
        this.t.memberExpression(
          this.t.thisExpression(),
          this.t.identifier("_$childrenFuncs")
        ), []
      )
    )

    const getterNode = this.t.classMethod("get", this.t.identifier(key), [],
      this.t.blockStatement([
        this.t.returnStatement(
          childNum === true
            ? childrenFuncCallNode
            : this.t.memberExpression(
              childrenFuncCallNode,
              this.t.numericLiteral(childNum - 1),
              true
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
    if (!this.t.isIdentifier(node.key)) return

    // ---- Already has _$contentProp
    if (this.classBodyNode.body.some(n => (
      this.t.isClassProperty(n) &&
      (n.key as t.Identifier).name === "_$contentProp")
    )) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode.body.indexOf(node)

    const derivedStatusKey = this.t.classProperty(
      this.t.identifier("_$contentProp"),
      this.t.stringLiteral(key)
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
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode.body.indexOf(node)
    const tag: string = decoratorName.toLowerCase()

    const derivedStatusKey = this.t.classProperty(
      this.t.identifier(`_$$$${key}`),
      this.t.stringLiteral(tag)
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
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    node.key.name = `_$$${key}`
    const propertyIdx = this.classBodyNode.body.indexOf(node)

    const depsNode = this.t.classProperty(
      this.t.identifier(`_$$${key}Deps`),
      this.t.newExpression(this.t.identifier("Set"), [])
    )

    const getterNode = this.t.classMethod("get", this.t.identifier(key), [],
      this.t.blockStatement([
        this.t.returnStatement(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier(`_$$${key}`)
          )
        )
      ])
    )

    const setterNode = this.t.classMethod("set", this.t.identifier(key), [
      this.t.identifier("value")
    ],
    this.t.blockStatement([
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier("_$updateProperty")
          ), [
            this.t.stringLiteral(key),
            this.t.identifier("value")
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
    if (this.includes.includes("*")) return true
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
  private isDLightView(path: NodePath<t.ClassDeclaration | t.ClassExpression>): boolean {
    const node = path.node
    const decorators = node.decorators ?? []
    const isDecorator = decorators.find((deco: t.Decorator) => this.t.isIdentifier(deco.expression, { name: "View" }))
    if (isDecorator) {
      node.superClass = this.t.identifier("View")
      node.decorators = node.decorators?.filter((deco: t.Decorator) => (
        !this.t.isIdentifier(deco.expression, { name: "View" })
      ))
    }
    return this.t.isIdentifier(node.superClass, { name: "View" })
  }

  /**
   * @brief Remove decorators by name
   *  Only search for Identifier and CallExpression, e.g, @Ok, @Ok()
   * @param decorators
   * @param names
   * @returns new decorators
   */
  private removeDecorators(decorators: t.Decorator[] | undefined | null, names: string[]): t.Decorator[] {
    if (!decorators) return []
    return decorators.filter(d => !(
      (this.t.isIdentifier(d.expression) &&
      names.includes(d.expression.name)) ||
      (this.t.isCallExpression(d.expression) &&
      this.t.isIdentifier(d.expression.callee) &&
      names.includes(d.expression.callee.name))
    ))
  }

  /**
   * @brief Find decorator by name,
   *  Only search for Identifier and CallExpression, e.g, @Ok, @Ok()
   * @param decorators
   * @param name
   * @returns Identifier or CallExpression or nothing
   */
  private findDecoratorByName(decorators: t.Decorator[] | undefined | null, name: string): t.Identifier | t.CallExpression | undefined {
    if (!decorators) return
    return decorators.find(deco => (
      this.t.isIdentifier(deco.expression, { name }) ||
      (this.t.isCallExpression(deco.expression) && this.t.isIdentifier(deco.expression.callee, { name }))
    ))?.expression as t.Identifier | t.CallExpression | undefined
  }

  /**
   * @brief Bind method's this to the class
   * @param methodName
   */
  private bindMethod(methodName: string): void {
    if (!this.classBodyNode) return
    let constructorNode: t.ClassMethod | undefined = this.classBodyNode.body
      .find(n => this.t.isClassMethod(n) && this.t.isIdentifier(n.key) && n.key.name === "constructor") as t.ClassMethod | undefined
    // ---- Add constructor if not exists
    if (!constructorNode) {
      constructorNode = this.t.classMethod(
        "constructor",
        this.t.identifier("constructor"),
        [],
        this.t.blockStatement([
          this.t.expressionStatement(this.t.callExpression(this.t.super(), []))
        ])
      )
      this.classBodyNode.body.unshift(constructorNode)
    }
    // ---- Add method binding to constructor, e.g. this.methodName = this.methodName.bind(this)
    constructorNode.body.body.push(
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier(methodName)
          ),
          this.t.callExpression(
            this.t.memberExpression(
              this.t.memberExpression(
                this.t.thisExpression(),
                this.t.identifier(methodName)
              ),
              this.t.identifier("bind")
            ),
            [this.t.thisExpression()]
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
  getDependencies(path: NodePath<t.ClassMethod | t.ClassProperty>): string[] {
    const node = path.node
    if (!this.t.isIdentifier(node.key)) return []

    // ---- Deps: console.log(this.count)
    const deps = new Set<string>()
    // ---- Assign deps: this.count = 1 / this.count++
    const assignDeps = new Set<string>()
    path.scope.traverse(node, {
      MemberExpression: innerPath => {
        if (!this.t.isIdentifier(innerPath.node.property)) return
        const propertyKey = innerPath.node.property.name
        if (isAssignmentExpressionLeft(innerPath, this.t)) {
          assignDeps.add(propertyKey)
        } else if (
          this.availableProperties.includes(propertyKey) &&
          this.t.isThisExpression(innerPath.node.object) &&
          !isMemberInEscapeFunction(innerPath, this.classDeclarationNode!, this.t) &&
          !isMemberInManualFunction(innerPath, this.classDeclarationNode!, this.t) &&
          !isAssignmentExpressionRight(innerPath, this.classDeclarationNode!, this.t)
        ) {
          deps.add(propertyKey)
          this.fullDepMap[propertyKey]?.forEach(deps.add.bind(deps))
        }
      }
    })

    // ---- Eliminate deps that are assigned in the same method
    //      e.g. { console.log(this.count); this.count = 1 }
    //      this will cause infinite loop
    //      so we eliminate "count" from deps
    assignDeps.forEach(deps.delete.bind(deps))

    // ---- Add deps to fullDepMap
    const propertyKey = node.key.name
    const depArr = [...deps]
    if (deps.size > 0) {
      this.fullDepMap[propertyKey] = depArr
    }

    return depArr
  }

  /**
   * @brief Transform arrow function property to method
   * @param propertyNode
   * @returns new method node
   */
  arrowFunctionPropertyToMethod(propertyNode: t.ClassProperty): t.ClassMethod | undefined {
    if (this.t.isArrowFunctionExpression(propertyNode.value)) return
    let newNode: t.ClassMethod | undefined
    this.classRootPath!.scope.traverse(this.classBodyNode!, {
      ClassProperty: innerPath => {
        if (innerPath.node !== propertyNode) return
        const propertyBody = (propertyNode.value as t.ArrowFunctionExpression).body
        const body = this.t.isExpression(propertyBody) ? this.t.blockStatement([this.t.returnStatement(propertyBody)]) : propertyBody
        const methodNode = this.t.classMethod(
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
    return this.t.isMemberExpression(parentNode) && !parentNode.computed && parentNode.property === currentNode
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
}

/**
 * @brief Change the PluginProvider class for class inheritance
 */
export let PluginProviderClass = PluginProvider
export function changePluginProviderClass(cls: typeof PluginProvider) {
  PluginProviderClass = cls
}
