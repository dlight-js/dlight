import { type CustomViewParserUnit, type EnvViewParserUnit, type ExpViewParserUnit, type ForViewParserUnit, type HTMLViewParserUnit, type IdentifierToDepNode, type IfViewParserUnit, type TextViewParserUnit, type ViewParserProp, type ViewParserUnit } from "./types"
import { type types as t, type NodePath } from "@babel/core"
import { uid } from "./utils/utils"
import { isMemberInEscapeFunction, isMemberInManualFunction, isAssignmentExpressionLeft, isAssignmentExpressionRight } from "./utils/depChecker"

export class ViewGenerator {
  // ---- Const ----
  private readonly nodeNamePrefix = "_$node"

  // ---- Prop ----
  private readonly t: typeof t
  private readonly viewParserResult: ViewParserUnit[]
  private readonly classRootPath: NodePath<t.ClassDeclaration | t.ClassExpression>
  private readonly fullDepMap: Record<string, string[]>
  private readonly availableDeps: string[]
  private readonly subViewNames: string[]
  private readonly identifierToDepsMap: Record<string, IdentifierToDepNode[]>

  // ---- Data ----
  readonly usedProperties = new Set<string>()
  private readonly bodyStatements: t.Statement[] = []
  private currentUnitIdx = 0

  /**
   * @param types Types from Babel
   * @param viewParserResult View parsed unit list from view parser
   * @param classRootPath Root path of the DLight class to be transformed
   * @param fullDepMap Full dependency map from dep parser
   * @param subViewNames Sub view names, use this to check if a Custom node is a sub view
   * @param identifierToDepsMap Identifier name to class dependencies map, e.g., { itemInForLoop: ["count"] }
   */
  constructor(
    types: typeof t,
    viewParserResult: ViewParserUnit[],
    classRootPath: NodePath<t.ClassDeclaration | t.ClassExpression>,
    fullDepMap: Record<string, string[]>,
    subViewNames: string[],
    identifierToDepsMap: Record<string, IdentifierToDepNode[]>
  ) {
    this.t = types
    this.viewParserResult = viewParserResult
    this.classRootPath = classRootPath
    this.fullDepMap = fullDepMap
    this.availableDeps = Object.keys(fullDepMap)
    this.subViewNames = subViewNames
    this.identifierToDepsMap = identifierToDepsMap
  }

  /**
   * @brief Generate a view, called right after the constructor
   *  The reason why we don't generate the view in the constructor is that
   *  we accept class inheritance
   * @returns new generated view block statement
   */
  generate(): t.BlockStatement {
    this.viewParserResult.forEach(viewUnit => {
      this.addStatement(...this.resolveViewUnit(viewUnit))
      this.currentUnitIdx++
    })
    this.addReturnStatement()
    return this.t.blockStatement(this.bodyStatements)
  }

  /**
   * @brief Add a statement to the body
   * @param statements
   */
  private addStatement(...statements: t.Statement[]) {
    this.bodyStatements.push(...statements)
  }

  /**
   * @brief Parse a view unit according to its type
   * @param viewUnit
   * @returns
   */
  private resolveViewUnit(viewUnit: ViewParserUnit): t.Statement[] {
    if (this.isTextUnit(viewUnit)) return this.resolveText(viewUnit)
    if (this.isHTMLUnit(viewUnit)) return this.resolveHTML(viewUnit)
    if (this.isIfUnit(viewUnit)) return this.resolveIf(viewUnit)
    if (this.isForUnit(viewUnit)) return this.resolveFor(viewUnit)
    if (this.isExpUnit(viewUnit)) return this.resolveExp(viewUnit)
    if (this.isEnvUnit(viewUnit)) return this.resolveEnv(viewUnit)
    if (this.isSubViewUnit(viewUnit)) return this.resolveSubView(viewUnit)
    return this.resolveCustom(viewUnit)
  }

  /**
   * return [nodeNamePrefix + (0...this.viewParserResult.length-1)]
   */
  private addReturnStatement() {
    this.addStatement(
      this.t.returnStatement(
        this.t.arrayExpression(
          this.viewParserResult.map((viewParserUnit, idx) => {
            // ---- Special case for sub view, e.g. _$node2 is a sub view
            //      [_$node1, ..._$node2, _$node3]
            if (viewParserUnit.type === "custom" && viewParserUnit.isSubView) {
              return this.t.spreadElement(this.t.identifier(`_$node${idx}`))
            }
            return this.t.identifier(`_$node${idx}`)
          })
        )
      )
    )
  }

  /* ---- Text Unit ---- */
  /**
   * @Text
   * @param viewParserUnit
   * @returns
   */
  private resolveText(viewParserUnit: TextViewParserUnit): t.Statement[] {
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
  private declareTextNodeWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.declareDLNode(nodeName, this.t.identifier("TextNode"), [
        this.t.arrowFunctionExpression([], value),
        this.t.thisExpression(),
        this.t.arrayExpression(dependencies)
      ])
    ]
  }

  /**
   * const ${nodeName} = new DLight.TextNode(${value});
   */
  private declareTextNodeWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return [
      this.declareDLNode(nodeName, this.t.identifier("TextNode"), [
        value
      ])
    ]
  }

  /**
   * @HTML
   * @param viewParserUnit
   * @returns
   */
  /* ---- HTML Unit ---- */
  private resolveHTML(viewParserUnit: HTMLViewParserUnit): t.Statement[] {
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
  private declareHTMLNode(nodeName: string, tag: t.Expression): t.Statement[] {
    return [
      this.declareDLNode(nodeName, this.t.identifier("HtmlNode"), [
        tag
      ])
    ]
  }

  /**
   * (${value})(${nodeName});
   */
  private resolveHTMLDoSomething(nodeName: string, value: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          value, [this.t.identifier(nodeName)]
        )
      )
    ]
  }

  /**
   * this.forwardProps(${nodeName});
   */
  private resolveHTMLForwardProp(nodeName: string): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier("forwardProps")
          ), [this.t.identifier(nodeName)]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addLifeCycle(${value}, "${lifeCycleName}");
   */
  private resolveHTMLLifeCycle(nodeName: string, lifeCycleName: string, value: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addLifeCycle")
          ), [value, this.t.stringLiteral(lifeCycleName)]
        )
      )
    ]
  }

  /**
   * const const ${nodeName}Element = () => typeof ${value} === "function" ? (${value})(${nodeName}._$el) : ${value} = ${nodeName}._$el;
   */
  private resolveHTMLElementWithOnlyMemberExpression(nodeName: string, value: t.Expression): t.Statement[] {
    // ---- TODO: check if value is a valid lval
    if (!this.t.isLVal(value)) return []
    return [
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier(`${nodeName}Element`),
            this.t.arrowFunctionExpression([],
              this.t.conditionalExpression(
                this.t.binaryExpression("===",
                  this.t.unaryExpression("typeof", value),
                  this.t.stringLiteral("function")
                ),
                this.t.callExpression(
                  value, [
                    this.t.memberExpression(
                      this.t.identifier(nodeName),
                      this.t.identifier("_$el")
                    )
                  ]
                ),
                this.t.assignmentExpression("=", value,
                  this.t.memberExpression(
                    this.t.identifier(nodeName),
                    this.t.identifier("_$el")
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
  private resolveHTMLElementWithFunction(nodeName: string, value: t.Expression): t.Statement[] {
    if (!this.t.isFunctionExpression(value) && !this.t.isArrowFunctionExpression(value)) {
      throw new Error("Element prop in HTML should be a function or an identifier")
    }
    return [
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier(`${nodeName}Element`),
            this.t.arrowFunctionExpression(
              [],
              this.t.callExpression(
                value, [
                  this.t.memberExpression(
                    this.t.identifier(nodeName),
                    this.t.identifier("_$el")
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
  private callHTMLElementFunction(nodeName: string): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(`${nodeName}Element`), []
        )
      )
    ]
  }

  /**
   * this._$addDeps(${dependencies}, ${nodeName}Element, ${nodeName})
   */
  private addHTMLElementDeps(nodeName: string, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier("_$addDeps")
          ), [
            this.t.arrayExpression(dependencies),
            this.t.identifier(`${nodeName}Element`),
            this.t.identifier(nodeName)
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}.${funcName}(() => ${value}, this, ${dependencies});
   */
  private resolveHTMLSpecificFuncWithDep(nodeName: string, funcName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier(funcName)
          ), [
            this.t.arrowFunctionExpression([], value),
            this.t.thisExpression(),
            this.t.arrayExpression(dependencies)
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}.${funcName}(value);
   */
  private resolveHTMLSpecificFuncWithoutDep(nodeName: string, funcName: string, value: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier(funcName)
          ), [value]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addEvents(() => ${value}, this, ${dependencies});
   */
  private resolveHTMLAddEventsWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithDep(nodeName, "_$addEvents", value, dependencies)
  }

  /**
   * ${nodeName}._$addEvents(value);
   */
  private resolveHTMLAddEventsWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithoutDep(nodeName, "_$addEvents", value)
  }

  /**
   * ${nodeName}._$addAttributes(() => ${value}, this, ${dependencies});
   */
  private resolveHTMLAddAttributesWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithDep(nodeName, "_$addAttributes", value, dependencies)
  }

  /**
   * ${nodeName}._$addAttributes(value);
   */
  private resolveHTMLAddAttributesWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithoutDep(nodeName, "_$addAttributes", value)
  }

  /**
   * ${nodeName}._$addStyle(() => ${value}, this, ${dependencies});
   */
  private resolveHTMLAddStyleWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithDep(nodeName, "_$addStyle", value, dependencies)
  }

  /**
   * ${nodeName}._$addStyle(value);
   */
  private resolveHTMLAddStyleWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithoutDep(nodeName, "_$addStyle", value)
  }

  /**
   * ${nodeName}._$addClassName(() => ${value}, this, ${dependencies});
   */
  private resolveHTMLAddClassNameWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithDep(nodeName, "_$addClassName", value, dependencies)
  }

  /**
   * ${nodeName}._$addClassName(value);
   */
  private resolveHTMLAddClassNameWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithoutDep(nodeName, "_$addClassName", value)
  }

  /**
   * ${nodeName}.${funcName}("${key}", () => ${value}, this, ${dependencies});
   */
  private resolveHTMLSpecificFuncKeyWithDep(nodeName: string, key: string, funcName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier(funcName)
          ), [
            this.t.stringLiteral(key),
            this.t.arrowFunctionExpression([], value),
            this.t.thisExpression(),
            this.t.arrayExpression(dependencies)
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}.${funcName}("${key}", value);
   */
  private resolveHTMLSpecificFuncKeyWithoutDep(nodeName: string, key: string, funcName: string, value: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier(funcName)
          ), [
            this.t.stringLiteral(key),
            value
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addEvent("${key}", () => ${value}, this, ${dependencies});
   */
  private resolveHTMLAddEventWithDep(nodeName: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncKeyWithDep(nodeName, key, "_$addEvent", value, dependencies)
  }

  /**
   * ${nodeName}._$addEvent("${key}", value);
   */
  private resolveHTMLAddEventWithoutDep(nodeName: string, key: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncKeyWithoutDep(nodeName, key, "_$addEvent", value)
  }

  /**
   * ${nodeName}._$addProp("${key}", () => ${value}, this, ${dependencies});
   */
  private resolveHTMLAddPropWithDep(nodeName: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncKeyWithDep(nodeName, key, "_$addProp", value, dependencies)
  }

  /**
   * ${nodeName}._$addProp("${key}", value);
   */
  private resolveHTMLAddPropWithoutDep(nodeName: string, key: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncKeyWithoutDep(nodeName, key, "_$addProp", value)
  }

  /**
   * ${nodeName}._$addNodes((() => {
   *  ${children}
   * })())
   */
  private resolveHTMLChildren(nodeName: string, children: ViewParserUnit[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addNodes")
          ), [
            this.t.callExpression(
              this.t.arrowFunctionExpression([], this.generateView(children)),
              []
            )
          ]
        )
      )
    ]
  }

  /* ---- If Unit ---- */
  /**
   * @If
   * @param viewParserUnit
   * @returns
   */
  private resolveIf(viewParserUnit: IfViewParserUnit): t.Statement[] {
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
  private declareIfNode(nodeName: string): t.Statement[] {
    return [
      this.declareDLNode(nodeName, this.t.identifier("IfNode"), [])
    ]
  }

  /**
   * ${nodeName}._$addCond(() => ${condition}, () => {
   *  ${body}
   * }, this, ${dependencies});
   */
  private resolveIfConditionWithDep(nodeName: string, condition: t.Expression, body: ViewParserUnit[], dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addCond")
          ), [
            this.t.arrowFunctionExpression([], condition),
            this.t.arrowFunctionExpression([], this.generateView(body)),
            this.t.thisExpression(),
            this.t.arrayExpression(dependencies)
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
  private resolveIfConditionWithoutDep(nodeName: string, condition: t.Expression, body: ViewParserUnit[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addCond")
          ), [
            this.t.arrowFunctionExpression([], condition),
            this.t.arrowFunctionExpression([], this.generateView(body))
          ]
        )
      )
    ]
  }

  /* ---- For Unit ---- */
  /**
   * @For
   * @param viewParserUnit
   * @returns
   */
  private resolveFor(viewParserUnit: ForViewParserUnit): t.Statement[] {
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
      const itemStatements = this.t.isIdentifier(item)
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
  private declareForNode(nodeName: string): t.Statement[] {
    return [
      this.declareDLNode(nodeName, this.t.identifier("ForNode"), [])
    ]
  }

  /**
   * let ${item} = node_for._$getItem(_$key, _$idx);
   * const updateFunc = () => (
   *  ${item} = node_for._$getItem(_$key, _$idx)
   * )
   */
  private resolveForItemUpdateSimpleIdentifier(item: t.Identifier): t.Statement[] {
    return [
      this.t.variableDeclaration(
        "let", [
          this.t.variableDeclarator(
            item,
            this.t.callExpression(
              this.t.memberExpression(
                this.t.identifier("node_for"),
                this.t.identifier("_$getItem")
              ), [
                this.t.identifier("_$key"),
                this.t.identifier("_$idx")
              ]
            )
          )
        ]
      ),
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier("updateFunc"),
            this.t.arrowFunctionExpression(
              [],
              this.t.assignmentExpression(
                "=",
                item,
                this.t.callExpression(
                  this.t.memberExpression(
                    this.t.identifier("node_for"),
                    this.t.identifier("_$getItem")
                  ), [
                    this.t.identifier("_$key"),
                    this.t.identifier("_$idx")
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
  private resolveForItemUpdateComplexObject(item: t.LVal, forBody: t.BlockStatement): t.Statement[] {
    const itemObjName = `_itemObj${uid()}`
    const identifiersInItem = this.getIdentifiers(item)

    const statements = [
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            item,
            this.t.callExpression(
              this.t.memberExpression(
                this.t.identifier("node_for"),
                this.t.identifier("_$getItem")
              ), [
                this.t.identifier("_$key"),
                this.t.identifier("_$idx")
              ]
            )
          )
        ]
      ),
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier(itemObjName),
            this.t.objectExpression(
              identifiersInItem.map(i => this.t.objectProperty(
                this.t.identifier(i),
                this.t.identifier(i)
              ))
            )
          )
        ]
      ),
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier("updateFunc"),
            this.t.arrowFunctionExpression(
              [],
              this.t.blockStatement([
                this.t.variableDeclaration(
                  "const", [
                    this.t.variableDeclarator(
                      item,
                      this.t.callExpression(
                        this.t.memberExpression(
                          this.t.identifier("node_for"),
                          this.t.identifier("_$getItem")
                        ), [
                          this.t.identifier("_$key"),
                          this.t.identifier("_$idx")
                        ]
                      )
                    )
                  ]
                ),
                ...identifiersInItem.map(idName => (
                  this.t.expressionStatement(
                    this.t.assignmentExpression(
                      "=",
                      this.t.memberExpression(
                        this.t.identifier(itemObjName),
                        this.t.identifier(idName)
                      ),
                      this.t.identifier(idName)
                    )
                  )
                ))
              ])
            )
          )
        ]
      )
    ]

    // ---- Replace all identifiers in item with itemObjName.item
    const forBodyFunction = this.functionWrapper(forBody)
    this.classRootPath.scope.traverse(forBodyFunction, {
      Identifier: innerPath => {
        const currentNode = innerPath.node
        const parentNode = innerPath.parentPath?.node
        // ----- 1. Identifier name must be in item
        //       2. Must not be a member expression property like xxx.name
        //          but can be a member expression like name.xxx or xxx[name]
        //       3. Must not be an object key like { xxx: ANY }
        //       4. Must not be parameters from function
        if (
          !identifiersInItem.includes(currentNode.name) ||
          (
            this.t.isMemberExpression(parentNode) &&
            !parentNode.computed &&
            parentNode.property === currentNode
          ) ||
          (
            this.t.isObjectProperty(parentNode) &&
            parentNode.key === currentNode
          ) ||
          this.isAttrFromFunction(innerPath, currentNode.name, forBodyFunction)
        ) return
        // ---- Replace identifier with itemObjName.item
        const valueNode = this.t.memberExpression(
          this.t.identifier(itemObjName),
          this.t.identifier(innerPath.node.name)
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
  private resolveForMainNodeFuncWithDep(nodeName: string, itemBody: t.Statement[], forBody: t.BlockStatement, dependencies: IdentifierToDepNode[]): t.Statement[] {
    // ---- The reason to split add and delete deps is to make the dep order right
    //      because we need the updateFunc to be called before the forBody
    //      but to be removed after the forBody
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addNodeFunc")
          ), [
            this.t.arrowFunctionExpression([
              this.t.identifier("_$key"),
              this.t.identifier("_$idx"),
              this.t.identifier("node_for")
            ], this.t.blockStatement([
              ...itemBody,
              this.t.expressionStatement(
                this.t.callExpression(
                  this.t.memberExpression(
                    this.t.thisExpression(),
                    this.t.identifier("_$addDeps")
                  ), [
                    this.t.arrayExpression(dependencies),
                    this.t.identifier("updateFunc")
                  ]
                )
              ),
              // ---- Non-return statements
              ...forBody.body.slice(0, -1),
              this.t.expressionStatement(
                this.t.callExpression(
                  this.t.memberExpression(
                    this.t.thisExpression(),
                    this.t.identifier("_$deleteDeps")
                  ), [
                    this.t.arrayExpression(dependencies),
                    this.t.identifier("updateFunc"),
                    this.t.conditionalExpression(
                      this.t.callExpression(
                        this.t.memberExpression(this.t.identifier("Array"), this.t.identifier("isArray")), [
                          this.t.identifier("_$node0")
                        ]
                      ),
                      this.t.memberExpression(
                        this.t.identifier("_$node0"),
                        this.t.numericLiteral(0),
                        true
                      ),
                      this.t.identifier("_$node0")
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
  private resolveForKeyFunc(nodeName: string, array: t.Expression, item: t.LVal, key: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addKeyFunc")
          ), [
            this.t.arrowFunctionExpression(
              [],
              this.t.blockStatement([
                this.t.variableDeclaration(
                  "const", [
                    this.t.variableDeclarator(
                      this.t.identifier("keys"),
                      this.t.arrayExpression()
                    )
                  ]
                ),
                this.t.forOfStatement(
                  this.t.variableDeclaration(
                    "const", [
                      this.t.variableDeclarator(item)
                    ]
                  ),
                  array,
                  this.t.blockStatement([
                    this.t.expressionStatement(
                      this.t.callExpression(
                        this.t.memberExpression(
                          this.t.identifier("keys"),
                          this.t.identifier("push")
                        ), [key]
                      )
                    )
                  ])
                ),
                this.t.returnStatement(this.t.identifier("keys"))
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
  private resolveForArrayFunc(nodeName: string, array: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addArrayFunc")
          ), [
            this.t.thisExpression(),
            this.t.arrowFunctionExpression([], array),
            this.t.arrayExpression(dependencies)
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
  private resolveForMainNodeFuncWithoutDep(nodeName: string, array: t.Expression, item: t.LVal, forBody: t.BlockStatement): t.Statement[] {
    if (
      this.t.isMemberExpression(item) ||
      this.t.isArrayExpression(item) ||
      this.t.isBinaryExpression(item) ||
      this.t.isTSAsExpression(item) ||
      this.t.isTSTypeAssertion(item) ||
      this.t.isTSSatisfiesExpression(item) ||
      this.t.isTSNonNullExpression(item) ||
      this.t.isTSParameterProperty(item)
    ) {
      throw new Error("This'll never happen, or IanDx to blame")
    }
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addNodess")
          ), [
            this.t.arrowFunctionExpression(
              [],
              this.t.callExpression(
                this.t.memberExpression(
                  this.t.callExpression(
                    this.t.memberExpression(
                      this.t.identifier("Array"),
                      this.t.identifier("from")
                    ), [array]
                  ),
                  this.t.identifier("map")
                ), [
                  this.t.arrowFunctionExpression(
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
  private resolveExp(viewParserUnit: ExpViewParserUnit): t.Statement[] {
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
  private declareExpNodeWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.declareDLNode(nodeName, this.t.identifier("ExpressionNode"), [
        this.t.arrowFunctionExpression([], value),
        this.t.thisExpression(),
        this.t.arrayExpression(dependencies)
      ])
    ]
  }

  /**
   * const ${nodeName} = new DLight.ExpressionNode(${value});
   */
  private declareExpNodeWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return [
      this.declareDLNode(nodeName, this.t.identifier("ExpressionNode"), [
        value
      ])
    ]
  }

  /**
   * ${nodeName}._$onUpdateNodes(${value});
   */
  private resolveExpOnUpdateNodes(nodeName: string, value: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$onUpdateNodes")
          ), [value]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addProp("${key}", () => (${value}), this, ${dependencies});
   */
  private resolveExpAddPropWithDep(nodeName: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addProp")
          ), [
            this.t.stringLiteral(key),
            this.t.arrowFunctionExpression([], value),
            this.t.thisExpression(),
            this.t.arrayExpression(dependencies)
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addProp("${key}", ${value});
   */
  private resolveExpAddPropWithoutDep(nodeName: string, key: string, value: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addProp")
          ), [
            this.t.stringLiteral(key),
            value
          ]
        )
      )
    ]
  }

  /* ---- Environment Unit ---- */
  /**
   * @Env
   * @param viewParserUnit
   * @returns
   */
  private resolveEnv(viewParserUnit: EnvViewParserUnit): t.Statement[] {
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
  private declareEnvNode(nodeName: string): t.Statement[] {
    return [
      this.declareDLNode(nodeName, this.t.identifier("EnvNode"), [])
    ]
  }

  /**
   * ${nodeName}._$addNodes((() => {
   *  ${children}
   * }())
   */
  private resolveEnvChildren(nodeName: string, children: ViewParserUnit[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addNodes")
          ), [
            this.t.callExpression(
              this.t.arrowFunctionExpression([], this.generateView(children)),
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
  private resolveEnvAddPropWithDep(nodeName: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addProp")
          ), [
            this.t.stringLiteral(key),
            this.t.arrowFunctionExpression([], value),
            this.t.thisExpression(),
            this.t.arrayExpression(dependencies)
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addProp("${key}", ${value});
   */
  private resolveEnvAddPropWithoutDep(nodeName: string, key: string, value: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addProp")
          ), [
            this.t.stringLiteral(key),
            value
          ]
        )
      )
    ]
  }

  /* ---- Subview ---- */
  /**
   * @SubView
   * @param viewParserUnit
   * @returns
   */
  private resolveSubView(viewParserUnit: CustomViewParserUnit): t.Statement[] {
    viewParserUnit.isSubView = true
    const [statements, collect] = statementsCollector()
    const nodeName = this.generateDLNodeName()

    const rawProps: Record<string, ViewParserProp> = viewParserUnit.props ?? {}
    if (viewParserUnit.content) rawProps.content = viewParserUnit.content
    const props = this.preHandleProps(rawProps)
    const keyId = uid()
    const passProps: Array<{ key: string, dependencies: IdentifierToDepNode[] }> = []

    // ---- Props
    props.forEach(([key, value]) => {
      const dependencies = this.generateDependencyNodes(value)
      collect(this.resolveSubViewRedeclareProp(keyId, key, value, dependencies))
      if (dependencies.length > 0) {
        // ---- Add deps
        collect(this.addSubViewDeps(keyId, key, value, dependencies))
      }
      passProps.push({ key, dependencies })
    })

    // ---- Call sub view
    collect(this.callSubView(keyId, nodeName, viewParserUnit.tag, props))

    // ---- Delete deps
    passProps.forEach(({ key, dependencies }) => {
      if (dependencies.length > 0) {
        collect(this.deleteSubViewDeps(key, dependencies, nodeName))
      }
    })

    return statements
  }

  /**
   * const ${key}_${id} = {value: ${value}, deps: ${dependencies}};
   */
  private resolveSubViewRedeclareProp(id: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    const objNodes = [this.t.objectProperty(
      this.t.identifier("value"),
      value
    )]
    if (dependencies.length > 0) {
      objNodes.push(this.t.objectProperty(
        this.t.identifier("deps"),
        this.t.arrayExpression(dependencies)
      ))
    }
    return [
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier(`${key}_${id}`),
            this.t.objectExpression(objNodes)
          )
        ]
      )
    ]
  }

  /**
   * const ${key}UpdateFunc${this.currentUnitIdx} = () => ${keyWithId}.value = value
   * this._$addDeps(depsStr, ${key}UpdateFunc${this.currentUnitIdx});
   */
  private addSubViewDeps(id: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier(`${key}UpdateFunc${this.currentUnitIdx}`),
            this.t.arrowFunctionExpression(
              [],
              this.t.assignmentExpression(
                "=",
                this.t.memberExpression(
                  this.t.identifier(`${key}_${id}`),
                  this.t.identifier("value")
                ),
                value
              )
            )
          )
        ]
      ),
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier("_$addDeps")
          ), [
            this.t.arrayExpression(dependencies),
            this.t.identifier(`${key}UpdateFunc${this.currentUnitIdx}`)
          ]
        )
      )
    ]
  }

  /**
   * const nodeName = ${subView}({ [${key}: ${keyWithId}] })
   */
  private callSubView(id: string, nodeName: string, tag: t.Expression, props: Array<[string, t.Expression]>): t.Statement[] {
    return [
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier(nodeName),
            this.t.callExpression(
              tag, [
                this.t.objectExpression(props.map(([key]) => (
                  this.t.objectProperty(
                    this.t.identifier(key),
                    this.t.identifier(`${key}_${id}`)
                  )
                )))
              ]
            )
          )
        ]
      )
    ]
  }

  /**
   * this._$deleteDeps(${dependencies}, ${key}UpdateFunc${this.currentUnitIdx}, ${nodeName}[0]);
   */
  private deleteSubViewDeps(key: string, dependencies: IdentifierToDepNode[], nodeName: string): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier("_$deleteDeps")
          ), [
            this.t.arrayExpression(dependencies),
            this.t.identifier(`${key}UpdateFunc${this.currentUnitIdx}`),
            this.t.memberExpression(
              this.t.identifier(nodeName),
              this.t.numericLiteral(0),
              true
            )
          ]
        )
      )
    ]
  }

  /* ---- Custom Unit ---- */
  /**
   * @Custom
   * @param viewParserUnit
   * @returns
   */
  private resolveCustom(viewParserUnit: CustomViewParserUnit): t.Statement[] {
    const [statements, collect] = statementsCollector()
    const nodeName = this.generateDLNodeName()

    // ---- Declare node
    collect(this.declareCustomNode(nodeName, viewParserUnit.tag))

    // ---- Content prop
    if (viewParserUnit.content) {
      const content = this.resolveViewInProp(viewParserUnit.content)
      const dependencies = this.generateDependencyNodes(content)
      if (dependencies.length > 0) {
        collect(this.resolveCustomAddContentPropWithDep(nodeName, content, dependencies))
      } else {
        collect(this.resolveCustomAddContentPropWithoutDep(nodeName, content))
      }
    }

    // ---- Props
    this.preHandleProps(viewParserUnit.props).forEach(([key, value]) => {
      if (key === "do") return collect(this.resolveCustomDo(nodeName, value))
      if (key === "forwardProps") return collect(this.resolveCustomForwardProps(nodeName))
      if (["willMount", "didMount", "willUnmount", "didUnmount"].includes(key)) {
        return collect(this.resolveCustomLifecycle(nodeName, key, value))
      }
      const dependencies = this.generateDependencyNodes(value)
      if (key === "element") {
        if (this.isOnlyMemberExpression(value)) {
          collect(this.resolveCustomElementWithOnlyMemberExpression(nodeName, value))
        }
        collect(this.resolveCustomElementWithFunction(nodeName, value))
        collect(this.callCustomElementFunction(nodeName))
        if (dependencies.length > 0) collect(this.addCustomElementDeps(nodeName, dependencies))
        return
      }
      if (dependencies.length > 0) return collect(this.resolveCustomAddPropWithDep(nodeName, key, value, dependencies))
      collect(this.resolveCustomAddPropWithoutDep(nodeName, key, value))
    })

    // ---- Children
    const children = viewParserUnit.children
    if (children && children.length > 0) {
      collect(this.resolveCustomChildren(nodeName, children))
    }

    return statements
  }

  /**
   * const ${nodeName} = new (${tag})();
   */
  private declareCustomNode(nodeName: string, tag: t.Expression): t.Statement[] {
    return [
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier(nodeName),
            this.t.newExpression(tag, [])
          )
        ]
      )
    ]
  }

  /**
   * (${value})(${nodeName});
   */
  private resolveCustomDo(nodeName: string, value: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          value,
          [this.t.identifier(nodeName)]
        )
      )
    ]
  }

  /**
   * this.forwardProps(${nodeName});
   */
  private resolveCustomForwardProps(nodeName: string): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier("forwardProps")
          ), [this.t.identifier(nodeName)]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addLifeCycle(${value}, "${key}");
   */
  private resolveCustomLifecycle(nodeName: string, key: string, value: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addLifeCycle")
          ), [
            value,
            this.t.stringLiteral(key)
          ]
        )
      )
    ]
  }

  /**
   * const ${nodeName}Element = () => typeof ${value} === "function" ? (${value})(${nodeName}._$el) : ${value} = ${nodeName}._$el;
   */
  private resolveCustomElementWithOnlyMemberExpression(nodeName: string, value: t.Expression): t.Statement[] {
    if (!this.t.isLVal(value)) return []
    return [
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier(`${nodeName}Element`),
            this.t.arrowFunctionExpression([],
              this.t.conditionalExpression(
                this.t.binaryExpression("===",
                  this.t.unaryExpression("typeof", value),
                  this.t.stringLiteral("function")
                ),
                this.t.callExpression(
                  value, [
                    this.t.memberExpression(
                      this.t.identifier(nodeName),
                      this.t.identifier("_$el")
                    )
                  ]
                ),
                this.t.assignmentExpression("=", value,
                  this.t.memberExpression(
                    this.t.identifier(nodeName),
                    this.t.identifier("_$el")
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
  private resolveCustomElementWithFunction(nodeName: string, value: t.Expression): t.Statement[] {
    return [
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier(`${nodeName}Element`),
            this.t.arrowFunctionExpression([],
              this.t.callExpression(
                value, [
                  this.t.memberExpression(
                    this.t.identifier(nodeName),
                    this.t.identifier("_$el")
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
  private callCustomElementFunction(nodeName: string): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(`${nodeName}Element`),
          []
        )
      )
    ]
  }

  /**
   * this._$addDeps(${dependencies}, ${nodeName}Element, ${nodeName})
   */
  private addCustomElementDeps(nodeName: string, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier("_$addDeps")
          ), [
            this.t.arrayExpression(dependencies),
            this.t.identifier(`${nodeName}Element`),
            this.t.identifier(nodeName)
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addProp("${key}", () => (${value}), this, ${dependencies})
   */
  private resolveCustomAddPropWithDep(nodeName: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addProp")
          ), [
            this.t.stringLiteral(key),
            this.t.arrowFunctionExpression([], value),
            this.t.thisExpression(),
            this.t.arrayExpression(dependencies)
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addProp("${key}", ${value});
   */
  private resolveCustomAddPropWithoutDep(nodeName: string, key: string, value: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addProp")
          ), [
            this.t.stringLiteral(key),
            value
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addProp(() => (${value}), this, ${dependencies})
   */
  private resolveCustomAddContentPropWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addContentProp")
          ), [
            this.t.arrowFunctionExpression([], value),
            this.t.thisExpression(),
            this.t.arrayExpression(dependencies)
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addContentProp(${value});
   */
  private resolveCustomAddContentPropWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addContentProp")
          ), [value]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$addChildren(() => {
   *  ${children}
   * })
   */
  private resolveCustomChildren(nodeName: string, children: ViewParserUnit[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addChildren")
          ), [
            this.t.arrowFunctionExpression(
              [],
              this.generateView(children)
            )
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
  private isTextUnit(viewParserUnit: ViewParserUnit): viewParserUnit is TextViewParserUnit {
    return viewParserUnit.type === "text"
  }

  /**
   * @brief Check if a viewParserUnit is a HTML unit
   * @param viewParserUnit
   * @returns
   */
  private isHTMLUnit(viewParserUnit: ViewParserUnit): viewParserUnit is HTMLViewParserUnit {
    return viewParserUnit.type === "html"
  }

  /**
   * @brief Check if a viewParserUnit is a If unit
   * @param viewParserUnit
   * @returns
   */
  private isIfUnit(viewParserUnit: ViewParserUnit): viewParserUnit is IfViewParserUnit {
    return viewParserUnit.type === "if"
  }

  /**
   * @brief Check if a viewParserUnit is a For unit
   * @param viewParserUnit
   * @returns
   */
  private isForUnit(viewParserUnit: ViewParserUnit): viewParserUnit is ForViewParserUnit {
    return viewParserUnit.type === "for"
  }

  /**
   * @brief Check if a viewParserUnit is a Expression unit
   * @param viewParserUnit
   * @returns
   */
  private isExpUnit(viewParserUnit: ViewParserUnit): viewParserUnit is ExpViewParserUnit {
    return viewParserUnit.type === "exp"
  }

  /**
   * @brief Check if a viewParserUnit is a Environment unit
   * @param viewParserUnit
   * @returns
   */
  private isEnvUnit(viewParserUnit: ViewParserUnit): viewParserUnit is EnvViewParserUnit {
    return viewParserUnit.type === "env"
  }

  /**
   * @brief Check if a viewParserUnit is a SubView unit
   * @param viewParserUnit
   * @returns
   */
  private isSubViewUnit(viewParserUnit: ViewParserUnit): viewParserUnit is CustomViewParserUnit {
    if (viewParserUnit.type !== "custom") return false
    const tag = viewParserUnit.tag
    return (
      this.t.isMemberExpression(tag) &&
      this.t.isThisExpression(tag.object) &&
      this.t.isIdentifier(tag.property) &&
      this.subViewNames.includes(tag.property.name)
    )
  }

  /* ---- Dependency ---- */
  /**
   * @brief Generate all dependency nodes and add them to usedProperties
   * @param node
   * @returns dependency nodes
   */
  private generateDependencyNodes(node: t.Expression): IdentifierToDepNode[] {
    const depNodes = [
      ...this.getDependencyStringNodes(node),
      ...this.getIdentifierDependencyNodes(node)
    ]

    // ---- String Literal Nodes represent this.xxx dependency,
    //      add them to usedProperties for variable tree shaking
    const stringLiteralNodes = depNodes.filter(n => this.t.isStringLiteral(n)) as t.StringLiteral[]
    const stringLiteralNames = stringLiteralNodes.map(n => n.value)
    stringLiteralNames.forEach(this.usedProperties.add.bind(this.usedProperties))

    return depNodes
  }

  /**
   * @brief Generate explicit dependency nodes like this.count
   * @param node
   * @returns dependency nodes
   */
  private getDependencyStringNodes(node: t.Expression): t.StringLiteral[] {
    const deps = new Set<string>()

    this.classRootPath.scope.traverse(this.valueWrapper(node), {
      MemberExpression: innerPath => {
        if (!this.t.isIdentifier(innerPath.node.property)) return
        const propertyKey = innerPath.node.property.name
        if (
          this.availableDeps.includes(propertyKey) &&
          this.t.isThisExpression(innerPath.node.object) &&
          !isMemberInEscapeFunction(innerPath, this.classRootPath.node, this.t) &&
          !isMemberInManualFunction(innerPath, this.classRootPath.node, this.t) &&
          !isAssignmentExpressionLeft(innerPath, this.t) &&
          !isAssignmentExpressionRight(innerPath, this.classRootPath.node, this.t)
        ) {
          deps.add(propertyKey)
          this.fullDepMap[propertyKey].forEach(deps.add.bind(deps))
        }
      }
    })

    return [...deps].map(this.t.stringLiteral.bind(this.t))
  }

  /**
   * @brief Generate implicit dependency nodes for specific scenarios like ForNode and SubView
   * @param node
   * @returns dependency nodes
   */
  private getIdentifierDependencyNodes(node: t.Expression): IdentifierToDepNode[] {
    const deps = new Set<IdentifierToDepNode>()

    this.classRootPath.scope.traverse(this.valueWrapper(node), {
      Identifier: innerPath => {
        const identifier = innerPath.node
        const idName = identifier.name
        if (this.isAttrFromFunction(this.classRootPath, idName, node)) return
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
  private declareDLNode(dlNodeName: string, dlNodeType: t.Expression, args: Array<t.ArgumentPlaceholder | t.SpreadElement | t.Expression>) {
    return this.t.variableDeclaration(
      "const", [
        this.t.variableDeclarator(
          this.t.identifier(dlNodeName),
          this.t.newExpression(
            this.t.memberExpression(
              this.t.identifier("DLight"),
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
  private generateDLNodeName(): string {
    return `${this.nodeNamePrefix}${this.currentUnitIdx}`
  }

  /**
   * @brief Transform nested DLight view nodes string representation to actual code
   * @param prop
   * @returns transformed value
   */
  private resolveViewInProp(prop: ViewParserProp): t.Expression {
    const { value, nodes } = prop
    let newValue = value

    this.classRootPath.scope.traverse(this.valueWrapper(value), {
      StringLiteral: innerPath => {
        const id = innerPath.node.value
        const viewParserResult = nodes[id]
        if (!viewParserResult) return
        const newNode = (
          this.t.callExpression(
            this.t.arrowFunctionExpression([], this.generateView(viewParserResult)),
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
  private preHandleProps(props: Record<string, ViewParserProp> | undefined): Array<[string, t.Expression]> {
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
  private isOnlyMemberExpression(value: t.Expression): boolean {
    if (!this.t.isMemberExpression(value)) return false
    while (value.property) {
      if (this.t.isMemberExpression(value.property)) {
        value = value.property
        continue
      } else if (this.t.isIdentifier(value.property)) break
      else return false
    }
    return true
  }

  /**
   * @brief Shorthand method for generating a view body by duplicating this's parameters
   * @param viewParserResult
   * @returns view body
   */
  private generateView(viewParserResult: ViewParserUnit[], identifierToDepsMap?: Record<string, IdentifierToDepNode[]>): t.BlockStatement {
    const [body, usedProperties] = generateView(
      this.t,
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
  private getIdentifiers(node: t.Node): string[] {
    if (this.t.isIdentifier(node)) return [node.name]
    const identifierKeys = new Set<string>()
    this.classRootPath.scope.traverse(node, {
      Identifier: innerPath => {
        if (this.t.isObjectProperty(innerPath.parentPath.node)) return
        if (!this.t.isIdentifier(innerPath.node)) return
        identifierKeys.add(innerPath.node.name)
      },
      ObjectProperty: innerPath => {
        if (!this.t.isIdentifier(innerPath.node.value)) return
        identifierKeys.add(innerPath.node.value.name)
      }
    })
    return [...identifierKeys]
  }

  /**
   * @brief check if the identifier is from a function param till the stopNode
   *  e.g:
   *  function myFunc1(ok) { // stopNode = functionBody
   *     const myFunc2 = ok => ok // from function param
   *     console.log(ok) // not from function param
   *  }
   */
  private isAttrFromFunction(path: NodePath, idName: string, stopNode: t.Node) {
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
        return param.elements.filter(Boolean).map((el) => checkParam(el!)).includes(true)
      }
      if (this.t.isObjectPattern(param)) {
        return (param.properties
          .filter(prop => this.t.isObjectProperty(prop) && this.t.isIdentifier(prop.key)) as t.ObjectProperty[])
          .map(prop => (prop.key as t.Identifier).name)
          .includes(idName)
      }
      if (this.t.isRestElement(param)) return checkParam(param.argument)

      return false
    }

    while (reversePath && reversePath.node !== stopNode) {
      const node = reversePath.node
      if (this.t.isArrowFunctionExpression(node) || this.t.isFunctionDeclaration(node)) {
        for (const param of node.params) {
          if (checkParam(param)) return true
        }
      }
      reversePath = reversePath.parentPath
    }
    if (this.t.isClassMethod(stopNode)) {
      for (const param of stopNode.params) {
        if (checkParam(param)) return true
      }
    }
    return false
  }

  /**
   * @brief Wrap the value with a function declaration
   * function () {
   *  ${node}
   * }
   * @param node
   * @returns wrapped function
   */
  private functionWrapper(node: t.BlockStatement): t.FunctionDeclaration {
    return this.t.functionDeclaration(null, [], node)
  }

  /**
   * @brief Wrap the value with a variable declaration
   * const _ = ${value}
   * @param node
   * @returns wrapped value
   */
  private valueWrapper(node: t.Expression): t.VariableDeclaration {
    return this.t.variableDeclaration("const", [this.t.variableDeclarator(this.t.identifier("_"), node)])
  }
}

/**
 * @brief Generate a view body by duplicating this's parameters
 * @param types
 * @param viewParserResult
 * @param classRootPath
 * @param fullDepMap
 * @param subViewNames
 * @param identifierToDepsMap
 * @returns [view body, used properties]
 */
export function generateView(
  types: typeof t,
  viewParserResult: ViewParserUnit[],
  classRootPath: NodePath<t.ClassDeclaration | t.ClassExpression>,
  fullDepMap: Record<string, string[]>,
  subViewNames: string[],
  identifierToDepsMap: Record<string, IdentifierToDepNode[]>
): [t.BlockStatement, string[]] {
  const viewGenerator = new ViewGenerator(
    types,
    viewParserResult,
    classRootPath,
    fullDepMap,
    subViewNames,
    identifierToDepsMap
  )
  return [viewGenerator.generate(), [...viewGenerator.usedProperties]]
}

/**
 * @brief Collect statements and provide a collect function
 * @returns [statements, collect]
 */
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
