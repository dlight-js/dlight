import { type BabelPath } from "./types"
import * as t from "@babel/types"
import { type IfViewParserUnit, type ViewParserUnit, type HTMLViewParserUnit, type ForViewParserUnit, type TextViewParserUnit, type ExpViewParserUnit, type ViewParserProp, type EnvViewParserUnit, type CustomViewParserUnit } from "./viewParser"
import { functionWrapper, isAttrFromFunction, valueWrapper } from "./utils/babelNode"
import { isMemberInEscapeFunction, isMemberInManualFunction, isAssignmentExpressionLeft, isAssignmentExpressionRight } from "./nodeHelper"
import { uid } from "./utils/utils"

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

  // ---- Data ----
  readonly usedProperties = new Set<string>()
  private readonly bodyStatements: t.Statement[] = []
  private currentUnitIdx = 0

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
      this.addStatement(...this.resolveViewUnit(viewUnit))
      this.currentUnitIdx++
    })
    this.addReturnStatement()
    return t.blockStatement(this.bodyStatements)
  }

  private addStatement(...statements: t.Statement[]) {
    this.bodyStatements.push(...statements)
  }

  private resolveViewUnit(viewUnit: ViewParserUnit): t.Statement[] {
    if (this.isTextUnit(viewUnit)) return this.resolveText(viewUnit)
    if (this.isHTMLUnit(viewUnit)) return this.resolveHTML(viewUnit)
    if (this.isIfUnit(viewUnit)) return this.resolveIf(viewUnit)
    if (this.isForUnit(viewUnit)) return this.resolveFor(viewUnit)
    if (this.isExpUnit(viewUnit)) return this.resolveExp(viewUnit)
    if (this.isEnvUnit(viewUnit)) return this.resolveEnv(viewUnit)

    return []
  }

  /**
   * return [nodeNamePrefix + (0...this.viewParserResult.length-1)]
   */
  private addReturnStatement() {
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
  resolveText(viewParserUnit: TextViewParserUnit): t.Statement[] {
    const value = viewParserUnit.content
    const dependencies = this.generateDependencyNodes(value)
    const nodeName = this.generateDLNodeName()

    if (dependencies.length > 0) {
      return this.declareTextNodeWithDep(nodeName, value, dependencies)
    }
    return this.declareTextNodeWithoutDep(nodeName, value)
  }

  /**
   * const ${nodeName} = new DLight.TextNode(() => ${value}, this, ${geneDepsStr(dependencies)});
   */
  declareTextNodeWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.declareDLNode(nodeName, t.identifier("TextNode"), [
        t.arrowFunctionExpression([], value),
        t.thisExpression(),
        t.arrayExpression(dependencies)
      ])
    ]
  }

  /**
   * const ${nodeName} = new DLight.TextNode(${value});
   */
  declareTextNodeWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return [
      this.declareDLNode(nodeName, t.identifier("TextNode"), [
        value
      ])
    ]
  }

  /* ---- HTML Unit ---- */
  resolveHTML(viewParserUnit: HTMLViewParserUnit): t.Statement[] {
    const [statements, collect] = statementsCollector()
    const tag = viewParserUnit.tag
    const nodeName = this.generateDLNodeName()
    statements.push(...this.declareHTMLNode(nodeName, tag))

    // ---- Props
    const props: Record<string, ViewParserProp> = viewParserUnit.props ?? {}
    // ---- Add content prop as innerText
    if (viewParserUnit.content) props.innerText = viewParserUnit.content
    this.preHandleProps(props).forEach(([key, value]) => {
      if (key === "do") return collect(this.resolveHTMLDoSomething(nodeName, value))
      if (key === "forwardProps") return collect(this.resolveHTMLForwardProp(nodeName))
      if (["willAppear", "didAppear", "willDisappear", "didDisappear"].includes(key)) {
        return collect(this.resolveHTMLLifeCycle(nodeName, key, value))
      }
      const dependencies = this.generateDependencyNodes(value)
      if (key === "element") {
        if (this.isOnlyMemberExpression(value)) {
          collect(this.resolveHTMLElementWithOnlyMemberExpression(nodeName, value))
        } else {
          collect(this.resolveHTMLElementWithFunction(nodeName, value))
        }
        collect(this.callHTMLElementFunction(nodeName))
        if (dependencies.length > 0) collect(this.addHTMLElementDeps(nodeName, dependencies))
        return
      }
      if (key === "addEvents") {
        if (dependencies.length > 0) return collect(this.resolveHTMLAddEventsWithDep(nodeName, value, dependencies))
        return collect(this.resolveHTMLAddEventsWithoutDep(nodeName, value))
      }
      if (key === "addAttributes") {
        if (dependencies.length > 0) return collect(this.resolveHTMLAddAttributesWithDep(nodeName, value, dependencies))
        return collect(this.resolveHTMLAddAttributesWithoutDep(nodeName, value))
      }
      if (key === "addStyle") {
        if (dependencies.length > 0) return collect(this.resolveHTMLAddStyleWithDep(nodeName, value, dependencies))
        return collect(this.resolveHTMLAddStyleWithoutDep(nodeName, value))
      }
      if (key === "addClassName") {
        if (dependencies.length > 0) return collect(this.resolveHTMLAddClassNameWithDep(nodeName, value, dependencies))
        return collect(this.resolveHTMLAddClassNameWithoutDep(nodeName, value))
      }
      if (key.startsWith("on")) {
        key = key.slice(2)
        if (dependencies.length > 0) return collect(this.resolveHTMLAddEventWithDep(nodeName, key, value, dependencies))
        return collect(this.resolveHTMLAddEventWithoutDep(nodeName, key, value))
      }
      if (key === "_$content") key = "innerText"
      if (dependencies.length > 0) return collect(this.resolveHTMLAddPropWithDep(nodeName, key, value, dependencies))
      collect(this.resolveHTMLAddPropWithoutDep(nodeName, key, value))
    })

    // ---- Children
    const children = viewParserUnit.children
    if (children && children.length > 0) {
      collect(this.resolveHTMLChildren(nodeName, children))
    }

    return statements
  }

  /**
   * const ${nodeName} = new DLight.HtmlNode(${tag})
   */
  declareHTMLNode(nodeName: string, tag: t.Expression): t.Statement[] {
    return [
      this.declareDLNode(nodeName, t.identifier("HtmlNode"), [
        tag
      ])
    ]
  }

  /**
   * (${value})(${nodeName});
   */
  resolveHTMLDoSomething(nodeName: string, value: t.Expression): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          value, [t.identifier(nodeName)]
        )
      )
    ]
  }

  /**
   * this.forwardProps(${nodeName});
   */
  resolveHTMLForwardProp(nodeName: string): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.thisExpression(),
            t.identifier("forwardProps")
          ), [t.identifier(nodeName)]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addLifeCycle(${value}, "${lifeCycleName}");
   */
  resolveHTMLLifeCycle(nodeName: string, lifeCycleName: string, value: t.Expression): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$addLifeCycle")
          ), [value, t.stringLiteral(lifeCycleName)]
        )
      )
    ]
  }

  /**
   * const const ${nodeName}Element = () => typeof ${value} === "function" ? (${value})(${nodeName}._$el) : ${value} = ${nodeName}._$el;
   */
  resolveHTMLElementWithOnlyMemberExpression(nodeName: string, value: t.Expression): t.Statement[] {
    // ---- TODO: check if value is a valid lval
    if (!t.isLVal(value)) return []
    return [
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
    ]
  }

  /**
   * const ${nodeName}Element = () => (${value})(${nodeName}._$el)
   */
  resolveHTMLElementWithFunction(nodeName: string, value: t.Expression): t.Statement[] {
    if (!t.isFunctionExpression(value) || !t.isArrowFunctionExpression(value)) return []
    return [
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
    ]
  }

  /**
   * ${nodeName}Element()
   */
  callHTMLElementFunction(nodeName: string): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          t.identifier(`${nodeName}Element`), []
        )
      )
    ]
  }

  /**
   * this._$addDeps(${dependencies}, ${nodeName}Element, ${nodeName})
   */
  addHTMLElementDeps(nodeName: string, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
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
    ]
  }

  /**
   * ${nodeName}.${funcName}(() => ${value}, this, ${dependencies});
   */
  resolveHTMLSpecificFuncWithDep(nodeName: string, funcName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
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
    ]
  }

  /**
   * ${nodeName}.${funcName}(value);
   */
  resolveHTMLSpecificFuncWithoutDep(nodeName: string, funcName: string, value: t.Expression): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier(funcName)
          ), [value]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addEvents(() => ${value}, this, ${dependencies});
   */
  resolveHTMLAddEventsWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithDep(nodeName, "_$addEvents", value, dependencies)
  }

  /**
   * ${nodeName}._$addEvents(value);
   */
  resolveHTMLAddEventsWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithoutDep(nodeName, "_$addEvents", value)
  }

  /**
   * ${nodeName}._$addAttributes(() => ${value}, this, ${dependencies});
   */
  resolveHTMLAddAttributesWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithDep(nodeName, "_$addAttributes", value, dependencies)
  }

  /**
   * ${nodeName}._$addAttributes(value);
   */
  resolveHTMLAddAttributesWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithoutDep(nodeName, "_$addAttributes", value)
  }

  /**
   * ${nodeName}._$addStyle(() => ${value}, this, ${dependencies});
   */
  resolveHTMLAddStyleWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithDep(nodeName, "_$addStyle", value, dependencies)
  }

  /**
   * ${nodeName}._$addStyle(value);
   */
  resolveHTMLAddStyleWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithoutDep(nodeName, "_$addStyle", value)
  }

  /**
   * ${nodeName}._$addClassName(() => ${value}, this, ${dependencies});
   */
  resolveHTMLAddClassNameWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithDep(nodeName, "_$addClassName", value, dependencies)
  }

  /**
   * ${nodeName}._$addClassName(value);
   */
  resolveHTMLAddClassNameWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithoutDep(nodeName, "_$addClassName", value)
  }

  /**
   * ${nodeName}.${funcName}("${key}", () => ${value}, this, ${dependencies});
   */
  resolveHTMLSpecificFuncKeyWithDep(nodeName: string, key: string, funcName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
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
    ]
  }

  /**
   * ${nodeName}.${funcName}("${key}", value);
   */
  resolveHTMLSpecificFuncKeyWithoutDep(nodeName: string, key: string, funcName: string, value: t.Expression): t.Statement[] {
    return [
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
    ]
  }

  /**
   * ${nodeName}._$addEvent("${key}", () => ${value}, this, ${dependencies});
   */
  resolveHTMLAddEventWithDep(nodeName: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncKeyWithDep(nodeName, key, "_$addEvent", value, dependencies)
  }

  /**
   * ${nodeName}._$addEvent("${key}", value);
   */
  resolveHTMLAddEventWithoutDep(nodeName: string, key: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncKeyWithoutDep(nodeName, key, "_$addEvent", value)
  }

  /**
   * ${nodeName}._$addProp("${key}", () => ${value}, this, ${dependencies});
   */
  resolveHTMLAddPropWithDep(nodeName: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncKeyWithDep(nodeName, key, "_$addProp", value, dependencies)
  }

  /**
   * ${nodeName}._$addProp("${key}", value);
   */
  resolveHTMLAddPropWithoutDep(nodeName: string, key: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncKeyWithoutDep(nodeName, key, "_$addProp", value)
  }

  /**
   * ${nodeName}._$addNodes((() => {
   *  ${children}
   * })())
   */
  resolveHTMLChildren(nodeName: string, children: ViewParserUnit[]): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$addNodes")
          ), [
            t.callExpression(
              t.arrowFunctionExpression([], this.generateView(children)),
              []
            )
          ]
        )
      )
    ]
  }

  /* ---- If Unit ---- */
  resolveIf(viewParserUnit: IfViewParserUnit): t.Statement[] {
    const [statements, collect] = statementsCollector()
    const nodeName = this.generateDLNodeName()
    collect(this.declareIfNode(nodeName))

    // ---- Condition
    const conditions = viewParserUnit.conditions
    conditions.forEach(({ condition, body }) => {
      const dependencies = this.generateDependencyNodes(condition)
      if (dependencies.length > 0) {
        return collect(this.resolveIfConditionWithDep(nodeName, condition, body, dependencies))
      }
      collect(this.resolveIfConditionWithoutDep(nodeName, condition, body))
    })

    return statements
  }

  /**
   * const ${nodeName} = new DLight.IfNode();
   */
  declareIfNode(nodeName: string): t.Statement[] {
    return [
      this.declareDLNode(nodeName, t.identifier("IfNode"), [])
    ]
  }

  /**
   * ${nodeName}._$addCond(() => ${condition}, () => {
   *  ${body}
   * }, this, ${dependencies});
   */
  resolveIfConditionWithDep(nodeName: string, condition: t.Expression, body: ViewParserUnit[], dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$addCond")
          ), [
            t.arrowFunctionExpression([], condition),
            t.arrowFunctionExpression([], this.generateView(body)),
            t.thisExpression(),
            t.arrayExpression(dependencies)
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addCond(() => ${condition}, () => {
   *  ${body}
   * })
   */
  resolveIfConditionWithoutDep(nodeName: string, condition: t.Expression, body: ViewParserUnit[]): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$addCond")
          ), [
            t.arrowFunctionExpression([], condition),
            t.arrowFunctionExpression([], this.generateView(body))
          ]
        )
      )
    ]
  }

  /* ---- For Unit ---- */
  resolveFor(viewParserUnit: ForViewParserUnit): t.Statement[] {
    const [statements, collect] = statementsCollector()
    const nodeName = this.generateDLNodeName()
    collect(this.declareForNode(nodeName))

    const array = viewParserUnit.array
    const item = viewParserUnit.item
    const key = viewParserUnit.key
    const dependencies = this.generateDependencyNodes(array)

    // ---- Item
    if (dependencies.length > 0) {
      // ---- Dynamic item
      // ---- Keep track of the dependencies of the item
      //      e.g. for (const item of array) {}
      //           then every item should be updated when array is updated
      const identifierInItem = this.getIdentifiers(item)
      const identifierToDepsMap = {
        ...this.identifierToDepsMap,
        ...identifierInItem.reduce((acc, id) => ({
          ...acc,
          [id]: dependencies
        }), {})
      }
      const forBody = this.generateView(viewParserUnit.children, identifierToDepsMap)
      const itemStatements = t.isIdentifier(item)
        ? this.resolveForItemUpdateSimpleIdentifier(item)
        : this.resolveForItemUpdateComplexObject(item, forBody)

      // ---- _$addNodeFunc
      collect(
        this.resolveForMainNodeFuncWithDep(nodeName, itemStatements, forBody, dependencies)
      )

      // ---- _$addKeyFunc
      if (key) collect(this.resolveForKeyFunc(nodeName, array, item, key))

      // ---- _$addArrayFunc
      collect(this.resolveForArrayFunc(nodeName, array, dependencies))
    } else {
      // ---- Simple static array
      const forBody = this.generateView(viewParserUnit.children)
      collect(this.resolveForMainNodeFuncWithoutDep(nodeName, array, item, forBody))
    }

    return statements
  }

  /**
   * const ${nodeName} = new DLight.ForNode();
   */
  declareForNode(nodeName: string): t.Statement[] {
    return [
      this.declareDLNode(nodeName, t.identifier("ForNode"), [])
    ]
  }

  /**
   * let ${item} = node_for._$getItem(_$key, _$idx);
   * const updateFunc = () => (
   *  ${item} = node_for._$getItem(_$key, _$idx)
   * )
   */
  resolveForItemUpdateSimpleIdentifier(item: t.Identifier): t.Statement[] {
    return [
      t.variableDeclaration(
        "let", [
          t.variableDeclarator(
            item,
            t.callExpression(
              t.memberExpression(
                t.identifier("node_for"),
                t.identifier("_$getItem")
              ), [
                t.identifier("_$key"),
                t.identifier("_$idx")
              ]
            )
          )
        ]
      ),
      t.variableDeclaration(
        "const", [
          t.variableDeclarator(
            t.identifier("updateFunc"),
            t.arrowFunctionExpression(
              [],
              t.assignmentExpression(
                "=",
                item,
                t.callExpression(
                  t.memberExpression(
                    t.identifier("node_for"),
                    t.identifier("_$getItem")
                  ), [
                    t.identifier("_$key"),
                    t.identifier("_$idx")
                  ]
                )
              )
            )
          )
        ]
      )
    ]
  }

  /**
   * const ${item} = node_for._$getItem(_$key, _$idx);
   * const ${itemObjName} = { ...${item} };
   * const updateFunc = () => {
   *  const ${item} = node_for._$getItem(_$key, _$idx)
   *  ${itemObjName}.${each} = ${each in item};
   * }
   */
  resolveForItemUpdateComplexObject(item: t.LVal, forBody: t.BlockStatement): t.Statement[] {
    const itemObjName = `_itemObj${uid()}`
    const identifiersInItem = this.getIdentifiers(item)

    const statements = [
      t.variableDeclaration(
        "const", [
          t.variableDeclarator(
            item,
            t.callExpression(
              t.memberExpression(
                t.identifier("node_for"),
                t.identifier("_$getItem")
              ), [
                t.identifier("_$key"),
                t.identifier("_$idx")
              ]
            )
          )
        ]
      ),
      t.variableDeclaration(
        "const", [
          t.variableDeclarator(
            t.identifier(itemObjName),
            t.objectExpression(
              identifiersInItem.map(i => t.objectProperty(
                t.identifier(i),
                t.identifier(i)
              ))
            )
          )
        ]
      ),
      t.variableDeclaration(
        "const", [
          t.variableDeclarator(
            t.identifier("updateFunc"),
            t.arrowFunctionExpression(
              [],
              t.blockStatement([
                t.variableDeclaration(
                  "const", [
                    t.variableDeclarator(
                      item,
                      t.callExpression(
                        t.memberExpression(
                          t.identifier("node_for"),
                          t.identifier("_$getItem")
                        ), [
                          t.identifier("_$key"),
                          t.identifier("_$idx")
                        ]
                      )
                    )
                  ]
                ),
                ...identifiersInItem.map(idName => (
                  t.expressionStatement(
                    t.assignmentExpression(
                      "=",
                      t.memberExpression(
                        t.identifier(itemObjName),
                        t.identifier(idName)
                      ),
                      t.identifier(idName)
                    )
                  )
                ))
              ])
            )
          )
        ]
      )
    ]

    const forBodyFunction = functionWrapper(forBody)
    // ---- Replace all identifiers in item with itemObjName.item
    this.classRootPath.scope.traverse(forBodyFunction, {
      Identifier(innerPath: any) {
        const currentNode = innerPath.node
        const parentNode = innerPath.parentPath.node
        // ----- 1. Identifier name must be in item
        //       2. Must not be a member expression property like xxx.name
        //          but can be a member expression like name.xxx or xxx[name]
        //       3. Must not be an object key like { xxx: ANY }
        //       4. Must not be parameters from function
        if (
          !identifiersInItem.includes(currentNode) ||
          (
            t.isMemberExpression(parentNode) &&
            !parentNode.computed &&
            parentNode.property === currentNode
          ) ||
          (
            t.isObjectProperty(parentNode) &&
            parentNode.key === currentNode
          ) ||
          isAttrFromFunction(innerPath, currentNode.name, forBodyFunction)
        ) return
        // ---- Replace identifier with itemObjName.item
        const valueNode = t.memberExpression(
          t.identifier(itemObjName),
          t.identifier(innerPath.node.name)
        )
        innerPath.replaceWith(valueNode)
        innerPath.skip()
      }
    })

    return statements
  }

  /**
   * ${nodeName}._$addNodeFunc((_$key, _$idx, node_for) => {
   *  ${itemStatements}
   *  this._$addDeps(${dependencies}, updateFunc)
   *  ${forBody.body}
   *  this._$deleteDeps(${dependencies}, updateFunc, Array.isArray(_$node0) ? _$node0[0] : _$node0);
   * })
   */
  resolveForMainNodeFuncWithDep(nodeName: string, itemBody: t.Statement[], forBody: t.BlockStatement, dependencies: IdentifierToDepNode[]): t.Statement[] {
    // ---- The reason to split add and delete deps is to make the dep order right
    //      because we need the updateFunc to be called before the forBody
    //      but to be removed after the forBody
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$addNodeFunc")
          ), [
            t.arrowFunctionExpression([
              t.identifier("_$key"),
              t.identifier("_$idx"),
              t.identifier("node_for")
            ], t.blockStatement([
              ...itemBody,
              t.expressionStatement(
                t.callExpression(
                  t.memberExpression(
                    t.thisExpression(),
                    t.identifier("_$addDeps")
                  ), [
                    t.arrayExpression(dependencies),
                    t.identifier("updateFunc")
                  ]
                )
              ),
              // ---- Non-return statements
              ...forBody.body.slice(0, -1),
              t.expressionStatement(
                t.callExpression(
                  t.memberExpression(
                    t.thisExpression(),
                    t.identifier("_$deleteDeps")
                  ), [
                    t.arrayExpression(dependencies),
                    t.identifier("updateFunc"),
                    t.conditionalExpression(
                      t.callExpression(
                        t.memberExpression(t.identifier("Array"), t.identifier("isArray")), [
                          t.identifier("_$node0")
                        ]
                      ),
                      t.memberExpression(
                        t.identifier("_$node0"),
                        t.numericLiteral(0),
                        true
                      ),
                      t.identifier("_$node0")
                    )
                  ]
                )
              ),
              // ---- Return statement
              forBody.body[forBody.body.length - 1]
            ]))
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addKeyFunc(() => {
   *   const keys = []
   *   for (const ${item} of ${array}) {
   *     keys.push(${key});
   *   }
   *   return keys
   * })
   */
  resolveForKeyFunc(nodeName: string, array: t.Expression, item: t.LVal, key: t.Expression): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$addKeyFunc")
          ), [
            t.arrowFunctionExpression(
              [],
              t.blockStatement([
                t.variableDeclaration(
                  "const", [
                    t.variableDeclarator(
                      t.identifier("keys"),
                      t.arrayExpression()
                    )
                  ]
                ),
                t.forOfStatement(
                  t.variableDeclaration(
                    "const", [
                      t.variableDeclarator(item)
                    ]
                  ),
                  array,
                  t.blockStatement([
                    t.expressionStatement(
                      t.callExpression(
                        t.memberExpression(
                          t.identifier("keys"),
                          t.identifier("push")
                        ), [key]
                      )
                    )
                  ])
                ),
                t.returnStatement(t.identifier("keys"))
              ])
            )
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addArrayFunc(this, () => (${array}), ${dependencies});
   */
  resolveForArrayFunc(nodeName: string, array: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$addArrayFunc")
          ), [
            t.thisExpression(),
            t.arrowFunctionExpression([], array),
            t.arrayExpression(dependencies)
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addNodess(() => (
   *  Array.from(${array}).map((${item}) => (() => {
   *    ${children}
   *  })())
   * ));
   */
  resolveForMainNodeFuncWithoutDep(nodeName: string, array: t.Expression, item: t.LVal, forBody: t.BlockStatement): t.Statement[] {
    if (
      t.isMemberExpression(item) ||
      t.isArrayExpression(item) ||
      t.isBinaryExpression(item) ||
      t.isTSAsExpression(item) ||
      t.isTSTypeAssertion(item) ||
      t.isTSSatisfiesExpression(item) ||
      t.isTSNonNullExpression(item) ||
      t.isTSParameterProperty(item)
    ) {
      throw new Error("This'll never happen, or IanDx to blame")
    }
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$addNodess")
          ), [
            t.arrowFunctionExpression(
              [],
              t.callExpression(
                t.memberExpression(
                  t.callExpression(
                    t.memberExpression(
                      t.identifier("Array"),
                      t.identifier("from")
                    ), [array]
                  ),
                  t.identifier("map")
                ), [
                  t.arrowFunctionExpression(
                    [item],
                    forBody
                  )
                ]
              )
            )
          ]
        )
      )
    ]
  }

  /* ---- Expression Unit ---- */
  resolveExp(viewParserUnit: ExpViewParserUnit): t.Statement[] {
    const [statements, collect] = statementsCollector()
    const nodeName = this.generateDLNodeName()

    // ---- Content and declare expression
    const contentValue = this.resolveViewInProp(viewParserUnit.content)
    const dependencies = this.generateDependencyNodes(contentValue)

    if (dependencies.length > 0) {
      collect(this.declareExpNodeWithDep(nodeName, contentValue, dependencies))
    } else {
      collect(this.declareExpNodeWithoutDep(nodeName, contentValue))
    }

    // ---- Props
    this.preHandleProps(viewParserUnit.props).forEach(([key, value]) => {
      if (key === "onUpdateNodes") return collect(this.resolveExpOnUpdateNodes(nodeName, value))
      const dependencies = this.generateDependencyNodes(value)
      if (dependencies.length > 0) return collect(this.resolveExpAddPropWithDep(nodeName, key, value, dependencies))
      collect(this.resolveExpAddPropWithoutDep(nodeName, key, value))
    })

    return statements
  }

  /**
   * const ${nodeName} = new DLight.ExpressionNode(() => ${value}, this, ${dependencies});
   */
  declareExpNodeWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.declareDLNode(nodeName, t.identifier("ExpressionNode"), [
        t.arrowFunctionExpression([], value),
        t.thisExpression(),
        t.arrayExpression(dependencies)
      ])
    ]
  }

  /**
   * const ${nodeName} = new DLight.ExpressionNode(${value});
   */
  declareExpNodeWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return [
      this.declareDLNode(nodeName, t.identifier("ExpressionNode"), [
        value
      ])
    ]
  }

  /**
   * ${nodeName}._$onUpdateNodes(${value});
   */
  resolveExpOnUpdateNodes(nodeName: string, value: t.Expression): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$onUpdateNodes")
          ), [value]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addProp("${key}", () => (${value}), this, ${dependencies});
   */
  resolveExpAddPropWithDep(nodeName: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$addProp")
          ), [
            t.stringLiteral(key),
            t.arrowFunctionExpression([], value),
            t.thisExpression(),
            t.arrayExpression(dependencies)
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addProp("${key}", ${value});
   */
  resolveExpAddPropWithoutDep(nodeName: string, key: string, value: t.Expression): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$addProp")
          ), [
            t.stringLiteral(key),
            value
          ]
        )
      )
    ]
  }

  /* ---- Environment Unit ---- */
  resolveEnv(viewParserUnit: EnvViewParserUnit): t.Statement[] {
    const [statements, collect] = statementsCollector()
    const nodeName = this.generateDLNodeName()

    collect(this.declareEnvNode(nodeName))
    // ---- Add children first
    const children = viewParserUnit.children
    if (children && children.length > 0) {
      collect(this.resolveEnvChildren(nodeName, children))
    }

    // ---- Props
    this.preHandleProps(viewParserUnit.props).forEach(([key, value]) => {
      const dependencies = this.generateDependencyNodes(value)
      if (dependencies.length > 0) return collect(this.resolveEnvAddPropWithDep(nodeName, key, value, dependencies))
      collect(this.resolveEnvAddPropWithoutDep(nodeName, key, value))
    })

    return statements
  }

  /**
   * const ${nodeName} = new DLight.EnvNode()
   */
  declareEnvNode(nodeName: string): t.Statement[] {
    return [
      this.declareDLNode(nodeName, t.identifier("EnvNode"), [])
    ]
  }

  /**
   * ${nodeName}._$addNodes((() => {
   *  ${children}
   * }())
   */
  resolveEnvChildren(nodeName: string, children: ViewParserUnit[]): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$addNodes")
          ), [
            t.callExpression(
              t.arrowFunctionExpression([], this.generateView(children)),
              []
            )
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addProp("${key}", () => (${value}), this, ${dependencies});
   */
  resolveEnvAddPropWithDep(nodeName: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$addProp")
          ), [
            t.stringLiteral(key),
            t.arrowFunctionExpression([], value),
            t.thisExpression(),
            t.arrayExpression(dependencies)
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addProp("${key}", ${value});
   */
  resolveEnvAddPropWithoutDep(nodeName: string, key: string, value: t.Expression): t.Statement[] {
    return [
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.identifier(nodeName),
            t.identifier("_$addProp")
          ), [
            t.stringLiteral(key),
            value
          ]
        )
      )
    ]
  }

  /* ---- Unit Type Checker ---- */
  /**
   * @brief Check if a viewParserUnit is a text unit
   * @param viewParserUnit
   * @returns
   */
  isTextUnit(viewParserUnit: ViewParserUnit): viewParserUnit is TextViewParserUnit {
    return viewParserUnit.type === "text"
  }

  /**
   * @brief Check if a viewParserUnit is a HTML unit
   * @param viewParserUnit
   * @returns
   */
  isHTMLUnit(viewParserUnit: ViewParserUnit): viewParserUnit is HTMLViewParserUnit {
    return viewParserUnit.type === "html"
  }

  /**
   * @brief Check if a viewParserUnit is a component unit
   * @param viewParserUnit
   * @returns
   */
  isIfUnit(viewParserUnit: ViewParserUnit): viewParserUnit is IfViewParserUnit {
    return viewParserUnit.type === "if"
  }

  /**
   * @brief Check if a viewParserUnit is a component unit
   * @param viewParserUnit
   * @returns
   */
  isForUnit(viewParserUnit: ViewParserUnit): viewParserUnit is ForViewParserUnit {
    return viewParserUnit.type === "for"
  }

  /**
   * @brief Check if a viewParserUnit is a component unit
   * @param viewParserUnit
   * @returns
   */
  isExpUnit(viewParserUnit: ViewParserUnit): viewParserUnit is ExpViewParserUnit {
    return viewParserUnit.type === "exp"
  }

  isEnvUnit(viewParserUnit: ViewParserUnit): viewParserUnit is EnvViewParserUnit {
    return viewParserUnit.type === "env"
  }

  isSubViewUnit(viewParserUnit: ViewParserUnit): viewParserUnit is CustomViewParserUnit {
    if (viewParserUnit.type !== "custom") return false
    const tag = viewParserUnit.tag
    return (
      t.isMemberExpression(tag) &&
      t.isThisExpression(tag.object) &&
      t.isIdentifier(tag.property) &&
      this.subViewNames.includes(tag.property.name)
    )
  }

  /* ---- Dependency ---- */
  /**
   * @brief Generate all dependency nodes and add them to usedProperties
   * @param node
   * @returns dependency nodes
   */
  generateDependencyNodes(node: t.Expression): IdentifierToDepNode[] {
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

  /**
   * @brief Generate explicit dependency nodes like this.count
   * @param node
   * @returns dependency nodes
   */
  getDependencyStringNodes(node: t.Expression): t.StringLiteral[] {
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

  /**
   * @brief Generate implicit dependency nodes for specific scenarios like ForNode and SubView
   * @param node
   * @returns dependency nodes
   */
  getIdentifierDependencyNodes(node: t.Expression): IdentifierToDepNode[] {
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
  /**
   * @brief Declare a DLNode
   *  const ${dlNodeId} = new DLight.${dlNodeType}(...args)
   * @param dlNodeId
   * @param dlNodeType
   * @param args
   * @returns
   */
  declareDLNode(dlNodeName: string, dlNodeType: t.Expression, args: Array<t.ArgumentPlaceholder | t.SpreadElement | t.Expression>) {
    return t.variableDeclaration(
      "const", [
        t.variableDeclarator(
          t.identifier(dlNodeName),
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

  /**
   * @brief Generate a DLNode name
   * @returns ${nodeNamePrefix}${currentUnitIdx}
   */
  generateDLNodeName(): string {
    return `${this.nodeNamePrefix}${this.currentUnitIdx}`
  }

  /**
   * @brief Transform nested DLight view nodes string representation to actual code
   * @param prop
   * @returns transformed value
   */
  resolveViewInProp(prop: ViewParserProp): t.Expression {
    const { value, nodes } = prop
    let newValue = value

    this.classRootPath.scope.traverse(valueWrapper(value), {
      StringLiteral: (innerPath: any) => {
        const id = innerPath.node.value
        const viewParserResult = nodes[id]
        if (!viewParserResult) return
        const newNode = (
          t.callExpression(
            t.arrowFunctionExpression([], this.generateView(viewParserResult)),
            []
          )
        )
        if (value === innerPath.node) newValue = newNode
        innerPath.replaceWith(newNode)
        innerPath.skip()
      }
    })
    // ---- The whole value may be a string representation,
    //      so we need to return the new value
    return newValue
  }

  /**
   * @brief Transform nested DLight view nodes string representation to actual code
   * @param props
   * @returns transformed props
   */
  preHandleProps(props: Record<string, ViewParserProp> | undefined): Array<[string, t.Expression]> {
    if (!props) return []
    return Object.entries(props).map(([key, prop]) => (
      [key, this.resolveViewInProp(prop)]
    ))
  }

  /**
   * @brief Check if the value is a member expression only node like this.xxx.bb.cc
   * @param value
   * @returns true if the value is a member expression only node
   */
  isOnlyMemberExpression(value: t.Expression): boolean {
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

  /**
   * @brief Shorthand method for generating a view body by duplicating this's parameters
   * @param viewParserResult
   * @returns view body
   */
  generateView(viewParserResult: ViewParserUnit[], identifierToDepsMap?: Record<string, IdentifierToDepNode[]>): t.BlockStatement {
    const [body, usedProperties] = generateView(
      viewParserResult,
      this.classRootPath,
      this.fullDepMap,
      this.subViewNames,
      identifierToDepsMap ?? this.identifierToDepsMap
    )
    usedProperties.forEach(this.usedProperties.add.bind(this.usedProperties))

    return body
  }

  /**
   * @brief Get all identifiers as strings in a node
   * @param node
   * @returns identifiers
   */
  getIdentifiers(node: t.Node): string[] {
    if (t.isIdentifier(node)) return [node.name]
    const identifierKeys = new Set<string>()
    this.classRootPath.scope.traverse(node, {
      Identifier(innerPath: any) {
        if (t.isObjectProperty(innerPath.parentPath.node)) return
        identifierKeys.add(innerPath.node.name)
      },
      ObjectProperty(innerPath: any) {
        identifierKeys.add(innerPath.node.value.name)
      }
    })
    return [...identifierKeys]
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

function statementsCollector(): [t.Statement[], (...statements: t.Statement[] | t.Statement[][]) => void] {
  const statements: t.Statement[] = []
  const collect = (...newStatements: t.Statement[] | t.Statement[][]) => {
    newStatements.forEach(s => {
      if (Array.isArray(s)) {
        statements.push(...s)
      } else {
        statements.push(s)
      }
    })
  }

  return [statements, collect]
}
