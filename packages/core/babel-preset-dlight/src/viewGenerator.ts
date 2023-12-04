import { type BabelPath } from "./types"
import * as t from "@babel/types"
import { type ViewParserUnit } from "./viewParser"
import { isAttrFromFunction, valueWrapper } from "./utils/babelNode"
import { isMemberInEscapeFunction, isMemberInManualFunction, isAssignmentExpressionLeft, isAssignmentExpressionRight } from "./nodeHelper"

export type IdentifierToDepNode = t.SpreadElement | t.Expression

export class ViewGenerator {
  // ---- Const ----
  private readonly htmlTags = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "menu", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "acronym", "applet", "basefont", "bgsound", "big", "blink", "center", "dir", "font", "frame", "frameset", "isindex", "keygen", "listing", "marquee", "menuitem", "multicol", "nextid", "nobr", "noembed", "noframes", "param", "plaintext", "rb", "rtc", "spacer", "strike", "tt", "xmp", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "svg", "switch", "symbol", "text", "textPath", "tspan", "use", "view"]
  private readonly nodeNamePrefix = "_$node"

  // ---- Prop ----
  private readonly viewParserResult: ViewParserUnit[]
  private readonly classRootPath: BabelPath
  private readonly fullDepMap: Record<string, string[]>
  private readonly availableDeps: string[]
  private readonly subViewNames: string[]
  private readonly identifierToDepsMap: Record<string, IdentifierToDepNode[]>

  usedProperties = new Set<string>()
  bodyStatements: t.Statement[] = []
  currentUnitIdx = 0

  constructor(
    viewParserResult: ViewParserUnit[],
    classRootPath: BabelPath,
    fullDepMap: Record<string, string[]>,
    subViewNames: string[],
    identifierToDepsMap: Record<string, IdentifierToDepNode[]>
  ) {
    this.viewParserResult = viewParserResult
    this.classRootPath = classRootPath
    this.fullDepMap = fullDepMap
    this.availableDeps = Object.keys(fullDepMap)
    this.subViewNames = subViewNames
    this.identifierToDepsMap = identifierToDepsMap
  }

  generate(): t.BlockStatement {
    this.viewParserResult.forEach(viewUnit => {
      this.resolveViewUnit(viewUnit)
      this.currentUnitIdx++
    })
    this.addReturnStatement()
    return t.blockStatement(this.bodyStatements)
  }

  addStatement(statement: t.Statement) {
    this.bodyStatements.push(statement)
  }

  resolveViewUnit(viewUnit: ViewParserUnit) {
    if (this.isTextUnit(viewUnit)) this.resolveText(viewUnit)
    else if (this.isHTMLUnit(viewUnit)) this.resolveHTML(viewUnit)
    // else if (this.isSubViewUnit(viewUnit)) this.resolveSubView(viewUnit, idx)
    // if (this.isSubViewTag(viewUnit)) this.resolveSubView(viewUnit, idx)
  }

  /**
   * return [nodeNamePrefix + (0...this.viewParserResult.length-1)]
   */
  addReturnStatement() {
    const length = this.viewParserResult.length
    this.addStatement(
      t.returnStatement(
        t.arrayExpression(
          Array.from({ length }, (_, i) => t.identifier(`${this.nodeNamePrefix}${i}`))
        )
      )
    )
  }

  /* ---- Text Unit ---- */
  resolveText(viewParserUnit: ViewParserUnit) {
    const value = viewParserUnit.attr._$content as t.Expression
    const dependencies = this.generateDependencyNodes(value)
    const nodeName = this.generateDLNodeName()

    if (dependencies.length > 0) {
      this.declareTextNodeWithDep(nodeName, value, dependencies)
    } else {
      this.declareTextNodeWithoutDep(nodeName, value)
    }
  }

  /**
   * const ${nodeName} = new DLight.TextNode(() => ${value}, this, ${geneDepsStr(dependencies)});
   */
  declareTextNodeWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]) {
    this.addStatement(
      this.declareDLNode(nodeName, t.identifier("TextNode"), [
        t.arrowFunctionExpression([], value),
        t.thisExpression(),
        t.arrayExpression(dependencies)
      ])
    )
  }

  /**
   * const ${nodeName} = new DLight.TextNode(${value});
   */
  declareTextNodeWithoutDep(nodeName: string, value: t.Expression) {
    this.addStatement(
      this.declareDLNode(nodeName, t.identifier("TextNode"), [
        value
      ])
    )
  }

  /* ---- HTML Unit ---- */
  resolveHTML(viewParserUnit: ViewParserUnit) {
    const tag = viewParserUnit.tag as t.Expression
    const nodeName = this.generateDLNodeName()
    this.declareHTMLNode(nodeName, tag)

    // ---- Props
    const props: Record<string, { value: t.Expression, nodes: ViewParserUnit[] }> =
      viewParserUnit.attr.props

    Object.entries(props).forEach(([key, { value, nodes }]) => {
      if (key === "do") return this.resolveHTMLDoSomething(nodeName, value)
      if (key === "forwardProps") return this.resolveHTMLForwardProp(nodeName)
      if (["willAppear", "didAppear", "willDisappear", "didDisappear"].includes(key)) {
        return this.resolveHTMLLifeCycle(nodeName, key, value)
      }
      const dependencies = this.generateDependencyNodes(value)
      if (key === "element") {
        if (this.isOnlyMemberExpression(value)) {
          this.resolveHTMLElementWithOnlyMemberExpression(nodeName, value)
        } else {
          this.resolveHTMLElementWithFunction(nodeName, value)
        }
        this.callHTMLElementFunction(nodeName, value)
        if (dependencies.length > 0) this.addHTMLElementDeps(nodeName, dependencies)
        return
      }
      if (key === "addEvents") {
        if (dependencies.length > 0) return this.resolveHTMLAddEventsWithDep(nodeName, value, dependencies)
        return this.resolveHTMLAddEventsWithoutDep(nodeName, value)
      }
      if (key === "addAttributes") {
        if (dependencies.length > 0) return this.resolveHTMLAddAttributesWithDep(nodeName, value, dependencies)
        return this.resolveHTMLAddAttributesWithoutDep(nodeName, value)
      }
      if (key === "addStyle") {
        if (dependencies.length > 0) return this.resolveHTMLAddStyleWithDep(nodeName, value, dependencies)
        return this.resolveHTMLAddStyleWithoutDep(nodeName, value)
      }
      if (key === "addClassName") {
        if (dependencies.length > 0) return this.resolveHTMLAddClassNameWithDep(nodeName, value, dependencies)
        return this.resolveHTMLAddClassNameWithoutDep(nodeName, value)
      }
      if (key.startsWith("on")) {
        key = key.slice(2)
        if (dependencies.length > 0) return this.resolveHTMLAddEventWithDep(nodeName, key, value, dependencies)
        return this.resolveHTMLAddEventWithoutDep(nodeName, key, value)
      }
      const isContent = key === "_$content"
      if (isContent) key = "innerText"
      if (dependencies.length > 0) return this.resolveHTMLAddPropWithDep(nodeName, key, value, dependencies)
      this.resolveHTMLAddPropWithoutDep(nodeName, key, value)
    })

    // ---- Children
    const children = viewParserUnit.children
    if (children.length > 0) this.resolveHTMLChildren(nodeName, children)
  }

  /**
   * const ${nodeName} = new DLight.HtmlNode(${tag})
   */
  declareHTMLNode(nodeName: string, tag: t.Expression) {
    this.addStatement(
      this.declareDLNode(nodeName, t.identifier("HtmlNode"), [
        tag
      ])
    )
  }

  /**
   * (${value})(${nodeName});
   */
  resolveHTMLDoSomething(nodeName: string, value: t.Expression) {
    this.addStatement(
      t.expressionStatement(
        t.callExpression(
          value, [t.identifier(nodeName)]
        )
      )
    )
  }

  /**
   * this.forwardProps(${nodeName});
   */
  resolveHTMLForwardProp(nodeName: string) {
    this.addStatement(
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.thisExpression(),
            t.identifier("forwardProps")
          ), [t.identifier(nodeName)]
        )
      )
    )
  }

  /**
   * ${nodeName}._$addLifeCycle(${value}, "${lifeCycleName}");
   */
  resolveHTMLLifeCycle(nodeName: string, lifeCycleName: string, value: t.Expression) {
    this.addStatement(
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$addLifeCycle")
          ), [value, t.stringLiteral(lifeCycleName)]
        )
      )
    )
  }

  /**
   * const const ${nodeName}Element = () => typeof ${value} === "function" ? (${value})(${nodeName}._$el) : ${value} = ${nodeName}._$el;
   */
  resolveHTMLElementWithOnlyMemberExpression(nodeName: string, value: t.Expression) {
    // ---- TODO: check if value is a valid lval
    if (!t.isLVal(value)) return
    this.addStatement(
      t.variableDeclaration(
        "const", [
          t.variableDeclarator(
            t.identifier(`${nodeName}Element`),
            t.arrowFunctionExpression([],
              t.conditionalExpression(
                t.binaryExpression("===",
                  t.unaryExpression("typeof", value),
                  t.stringLiteral("function")
                ),
                t.callExpression(
                  value, [
                    t.memberExpression(
                      t.identifier(nodeName),
                      t.identifier("_$el")
                    )
                  ]
                ),
                t.assignmentExpression("=", value,
                  t.memberExpression(
                    t.identifier(nodeName),
                    t.identifier("_$el")
                  )
                )
              )
            )
          )
        ]
      )
    )
  }

  /**
   * const ${nodeName}Element = () => (${value})(${nodeName}._$el)
   */
  resolveHTMLElementWithFunction(nodeName: string, value: t.Expression) {
    if (!t.isFunctionExpression(value) || !t.isArrowFunctionExpression(value)) return
    this.addStatement(
      t.variableDeclaration(
        "const", [
          t.variableDeclarator(
            t.identifier(`${nodeName}Element`),
            t.arrowFunctionExpression(
              [],
              t.callExpression(
                value, [
                  t.memberExpression(
                    t.identifier(nodeName),
                    t.identifier("_$el")
                  )
                ]
              )
            )
          )
        ]
      )
    )
  }

  /**
   * ${nodeName}Element()
   */
  callHTMLElementFunction(nodeName: string, value: t.Expression) {
    this.addStatement(
      t.expressionStatement(
        t.callExpression(
          t.identifier(`${nodeName}Element`), []
        )
      )
    )
  }

  /**
   * this._$addDeps(${dependencies}, ${nodeName}Element, ${nodeName})
   */
  addHTMLElementDeps(nodeName: string, dependencies: IdentifierToDepNode[]) {
    this.addStatement(
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.thisExpression(),
            t.identifier("_$addDeps")
          ), [
            t.arrayExpression(dependencies),
            t.identifier(`${nodeName}Element`),
            t.identifier(nodeName)
          ]
        )
      )
    )
  }

  /**
   * ${nodeName}.${funcName}(() => ${value}, this, ${dependencies});
   */
  resolveHTMLSpecificFuncWithDep(nodeName: string, funcName: string, value: t.Expression, dependencies: IdentifierToDepNode[]) {
    this.addStatement(
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier(funcName)
          ), [
            t.arrowFunctionExpression([], value),
            t.thisExpression(),
            t.arrayExpression(dependencies)
          ]
        )
      )
    )
  }

  /**
   * ${nodeName}.${funcName}(value);
   */
  resolveHTMLSpecificFuncWithoutDep(nodeName: string, funcName: string, value: t.Expression) {
    this.addStatement(
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier(funcName)
          ), [value]
        )
      )
    )
  }

  /**
   * ${nodeName}._$addEvents(() => ${value}, this, ${dependencies});
   */
  resolveHTMLAddEventsWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]) {
    this.resolveHTMLSpecificFuncWithDep(nodeName, "_$addEvents", value, dependencies)
  }

  /**
   * ${nodeName}._$addEvents(value);
   */
  resolveHTMLAddEventsWithoutDep(nodeName: string, value: t.Expression) {
    this.resolveHTMLSpecificFuncWithoutDep(nodeName, "_$addEvents", value)
  }

  /**
   * ${nodeName}._$addAttributes(() => ${value}, this, ${dependencies});
   */
  resolveHTMLAddAttributesWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]) {
    this.resolveHTMLSpecificFuncWithDep(nodeName, "_$addAttributes", value, dependencies)
  }

  /**
   * ${nodeName}._$addAttributes(value);
   */
  resolveHTMLAddAttributesWithoutDep(nodeName: string, value: t.Expression) {
    this.resolveHTMLSpecificFuncWithoutDep(nodeName, "_$addAttributes", value)
  }

  /**
   * ${nodeName}._$addStyle(() => ${value}, this, ${dependencies});
   */
  resolveHTMLAddStyleWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]) {
    this.resolveHTMLSpecificFuncWithDep(nodeName, "_$addStyle", value, dependencies)
  }

  /**
   * ${nodeName}._$addStyle(value);
   */
  resolveHTMLAddStyleWithoutDep(nodeName: string, value: t.Expression) {
    this.resolveHTMLSpecificFuncWithoutDep(nodeName, "_$addStyle", value)
  }

  /**
   * ${nodeName}._$addClassName(() => ${value}, this, ${dependencies});
   */
  resolveHTMLAddClassNameWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]) {
    this.resolveHTMLSpecificFuncWithDep(nodeName, "_$addClassName", value, dependencies)
  }

  /**
   * ${nodeName}._$addClassName(value);
   */
  resolveHTMLAddClassNameWithoutDep(nodeName: string, value: t.Expression) {
    this.resolveHTMLSpecificFuncWithoutDep(nodeName, "_$addClassName", value)
  }

  /**
   * ${nodeName}.${funcName}("${key}", () => ${value}, this, ${dependencies});
   */
  resolveHTMLSpecificFuncKeyWithDep(nodeName: string, key: string, funcName: string, value: t.Expression, dependencies: IdentifierToDepNode[]) {
    this.addStatement(
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier(funcName)
          ), [
            t.stringLiteral(key),
            t.arrowFunctionExpression([], value),
            t.thisExpression(),
            t.arrayExpression(dependencies)
          ]
        )
      )
    )
  }

  /**
   * ${nodeName}.${funcName}("${key}", value);
   */
  resolveHTMLSpecificFuncKeyWithoutDep(nodeName: string, key: string, funcName: string, value: t.Expression) {
    this.addStatement(
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier(funcName)
          ), [
            t.stringLiteral(key),
            value
          ]
        )
      )
    )
  }

  /**
   * ${nodeName}._$addEvent("${key}", () => ${value}, this, ${dependencies});
   */
  resolveHTMLAddEventWithDep(nodeName: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]) {
    this.resolveHTMLSpecificFuncKeyWithDep(nodeName, key, "_$addEvent", value, dependencies)
  }

  /**
   * ${nodeName}._$addEvent("${key}", value);
   */
  resolveHTMLAddEventWithoutDep(nodeName: string, key: string, value: t.Expression) {
    this.resolveHTMLSpecificFuncKeyWithoutDep(nodeName, key, "_$addEvent", value)
  }

  /**
   * ${nodeName}._$addProp("${key}", () => ${value}, this, ${dependencies});
   */
  resolveHTMLAddPropWithDep(nodeName: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]) {
    this.resolveHTMLSpecificFuncKeyWithDep(nodeName, key, "_$addProp", value, dependencies)
  }

  /**
   * ${nodeName}._$addProp("${key}", value);
   */
  resolveHTMLAddPropWithoutDep(nodeName: string, key: string, value: t.Expression) {
    this.resolveHTMLSpecificFuncKeyWithoutDep(nodeName, key, "_$addProp", value)
  }

  /**
   * ${nodeName}._$addNodes((() => {
   *  ${children}
   * })())
   */
  resolveHTMLChildren(nodeName: string, children: ViewParserUnit[]) {
    const newView = generateView(
      children,
      this.classRootPath,
      this.fullDepMap,
      this.subViewNames,
      this.identifierToDepsMap
    )[0]
    this.addStatement(
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$addNodes")
          ), [
            t.callExpression(
              t.arrowFunctionExpression([], newView),
              []
            )
          ]
        )
      )
    )
  }

  /* ---- Unit Type Checker ---- */
  isTextUnit(viewParserUnit: ViewParserUnit) {
    return viewParserUnit.tag === "_$text"
  }

  isSubViewUnit(viewParserUnit: ViewParserUnit) {
    const tag = viewParserUnit.tag
    return (
      typeof tag !== "string" &&
      t.isMemberExpression(tag) &&
      t.isThisExpression(tag.object) &&
      t.isIdentifier(tag.property) &&
      this.subViewNames.includes(tag.property.name)
    )
  }

  isHTMLUnit(viewUnit: ViewParserUnit) {
    const tag = viewUnit.tag
    if (typeof tag === "string") return false
    if (t.isIdentifier(tag) && this.htmlTags.includes(tag.name)) {
      viewUnit.tag = t.stringLiteral(tag.name)
      return true
    }
    if (t.isCallExpression(tag) && (tag.callee as any).name === "htmlTag") {
      viewUnit.tag = tag.arguments[0]
      return true
    }
    return false
  }

  /* ---- Dependency ---- */
  generateDependencyNodes(node: t.Node): IdentifierToDepNode[] {
    const depNodes = [
      ...this.getDependencyStringNodes(node),
      ...this.getIdentifierDependencyNodes(node)
    ]

    // ---- String Literal Nodes represent this.xxx dependency,
    //      add them to usedProperties for variable tree shaking
    const stringLiteralNodes = depNodes.filter(n => t.isStringLiteral(n)) as t.StringLiteral[]
    const stringLiteralNames = stringLiteralNodes.map(n => n.value)
    stringLiteralNames.forEach(this.usedProperties.add.bind(this.usedProperties))

    return depNodes
  }

  getDependencyStringNodes(node: t.Node): t.StringLiteral[] {
    const deps = new Set<string>()

    this.classRootPath.scope.traverse(valueWrapper(node), {
      MemberExpression: (innerPath: BabelPath) => {
        const propertyKey = innerPath.node.property.name
        if (
          this.availableDeps.includes(propertyKey) &&
          t.isThisExpression(innerPath.node.object) &&
          !isMemberInEscapeFunction(innerPath, this.classRootPath.node) &&
          !isMemberInManualFunction(innerPath, this.classRootPath.node) &&
          !isAssignmentExpressionLeft(innerPath) &&
          !isAssignmentExpressionRight(innerPath, this.classRootPath.node)
        ) {
          deps.add(propertyKey)
          this.fullDepMap[propertyKey].forEach(deps.add.bind(deps))
        }
      }
    })

    return [...deps].map(t.stringLiteral.bind(t))
  }

  getIdentifierDependencyNodes(node: t.Node): IdentifierToDepNode[] {
    const deps = new Set<IdentifierToDepNode>()

    this.classRootPath.scope.traverse(valueWrapper(node), {
      Identifier: (innerPath: BabelPath) => {
        const identifier = innerPath.node as t.Identifier
        const idName = identifier.name
        if (isAttrFromFunction(this.classRootPath, idName, node)) return
        const depsArray = this.identifierToDepsMap[idName]
        if (!depsArray) return
        depsArray.forEach(deps.add.bind(deps))
      }
    })

    return [...deps]
  }

  /* ---- Helper Functions ---- */
  declareDLNode(dlNodeId: string, dlNodeType: t.Expression, args: Array<t.ArgumentPlaceholder | t.SpreadElement | t.Expression>) {
    return t.variableDeclaration(
      "const", [
        t.variableDeclarator(
          t.identifier(dlNodeId),
          t.newExpression(
            t.memberExpression(
              t.identifier("DLight"),
              dlNodeType
            ), args
          )
        )
      ]
    )
  }

  generateDLNodeName() {
    return `${this.nodeNamePrefix}${this.currentUnitIdx}`
  }

  isOnlyMemberExpression(value: t.Expression) {
    if (!t.isMemberExpression(value)) return false
    while (value.property) {
      if (t.isMemberExpression(value.property)) {
        value = value.property
        continue
      } else if (t.isIdentifier(value.property)) break
      else return false
    }
    return true
  }
}

export function generateView(
  viewParserResult: ViewParserUnit[],
  classRootPath: BabelPath,
  fullDepMap: Record<string, string[]>,
  subViewNames: string[],
  identifierToDepsMap: Record<string, IdentifierToDepNode[]>
): [t.BlockStatement, string[]] {
  const viewGenerator = new ViewGenerator(
    viewParserResult,
    classRootPath,
    fullDepMap,
    subViewNames,
    identifierToDepsMap
  )
  return [viewGenerator.generate(), [...viewGenerator.usedProperties]]
}
