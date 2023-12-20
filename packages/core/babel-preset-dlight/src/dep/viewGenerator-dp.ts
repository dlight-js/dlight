import { type CustomViewParserUnit, type EnvViewParserUnit, type ExpViewParserUnit, type ForViewParserUnit, type HTMLViewParserUnit, type IdentifierToDepNode, type IfViewParserUnit, type TextViewParserUnit, type ViewParserProp, type ViewParserUnit } from "../types"
import { type types as t, type NodePath } from "@babel/core"
import { uid } from "../utils/utils"
import { isMemberInEscapeFunction, isMemberInManualFunction, isAssignmentExpressionLeft, isAssignmentExpressionRight } from "../utils/depChecker"

export class ViewGenerator {
  // ---- Const ----
  private readonly nodeNamePrefix = "$n"

  // ---- Prop ----
  private readonly t: typeof t
  private readonly viewParserResult: ViewParserUnit[]
  private readonly classRootPath: NodePath<t.ClassDeclaration | t.ClassExpression>
  private readonly fullDepMap: Record<string, string[]>
  private readonly availableProperties: string[]
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
   * @param availableProperties Available properties to become deps
   * @param subViewNames Sub view names, use this to check if a Custom node is a sub view
   * @param identifierToDepsMap Identifier name to class dependencies map, e.g., { itemInForLoop: ["count"] }
   */
  constructor(
    types: typeof t,
    viewParserResult: ViewParserUnit[],
    classRootPath: NodePath<t.ClassDeclaration | t.ClassExpression>,
    fullDepMap: Record<string, string[]>,
    availableProperties: string[],
    subViewNames: string[],
    identifierToDepsMap: Record<string, IdentifierToDepNode[]>
  ) {
    this.t = types
    this.viewParserResult = viewParserResult
    this.classRootPath = classRootPath
    this.fullDepMap = fullDepMap
    this.availableProperties = availableProperties
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
              return this.t.spreadElement(this.t.identifier(`${this.nodeNamePrefix}${idx}`))
            }
            return this.t.identifier(`${this.nodeNamePrefix}${idx}`)
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
    const [statements, collect] = statementsCollector()
    const value = viewParserUnit.content
    const dependencies = this.generateDependencyNodes(value)
    const nodeName = this.generateDLNodeName()
    collect(this.declareDLNode(nodeName, "t"))

    if (dependencies.length > 0) {
      collect(this.resolveTextWithDep(nodeName, value, dependencies))
    } else {
      collect(this.resolveTextWithoutDep(nodeName, value))
    }
    return statements
  }

  /**
   * ${nodeName}.t (() => ${value}, this, ${geneDepsStr(dependencies)});
   */
  private resolveTextWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("t")
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
   * ${nodeName}.t($value});
   */
  private resolveTextWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("t")
          ), [value]
        )
      )
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
    collect(this.declareDLNode(nodeName, "h"))
    collect(this.resolveHTMLAddTag(nodeName, tag))

    // ---- Props
    const props: Record<string, ViewParserProp> = viewParserUnit.props ?? {}
    // ---- Add content prop as innerText
    if (viewParserUnit.content) props.textContent = viewParserUnit.content
    this.preHandleProps(props).forEach(([key, value]) => {
      if (key === "do") return collect(this.resolveHTMLDoSomething(nodeName, value))
      if (key === "forwardProps") return collect(this.resolveHTMLForwardProp(nodeName))
      if (["willAppear", "didAppear", "willDisappear", "didDisappear"].includes(key)) {
        return collect(this.resolveHTMLLifecycle(nodeName, key, value))
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
      if (key === "events") {
        if (dependencies.length > 0) return collect(this.resolveHTMLAddEventsWithDep(nodeName, value, dependencies))
        return collect(this.resolveHTMLAddEventsWithoutDep(nodeName, value))
      }
      if (key === "attributes") {
        if (dependencies.length > 0) return collect(this.resolveHTMLAddAttributesWithDep(nodeName, value, dependencies))
        return collect(this.resolveHTMLAddAttributesWithoutDep(nodeName, value))
      }
      if (key === "style") {
        if (dependencies.length > 0) return collect(this.resolveHTMLAddStyleWithDep(nodeName, value, dependencies))
        return collect(this.resolveHTMLAddStyleWithoutDep(nodeName, value))
      }
      if (key === "class") {
        if (dependencies.length > 0) return collect(this.resolveHTMLAddClassNameWithDep(nodeName, value, dependencies))
        return collect(this.resolveHTMLAddClassNameWithoutDep(nodeName, value))
      }
      if (key.startsWith("on")) {
        // ---- e.g. onClick -> click
        key = key.slice(2).toLowerCase()
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
   * ${nodeName}.t(${tag});
   */
  private resolveHTMLAddTag(nodeName: string, tag: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("t")
          ), [tag]
        )
      )
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
   * ${nodeName}._$addLifecycle(${value}, "${lifecycleName}");
   */
  private resolveHTMLLifecycle(nodeName: string, lifecycleName: string, value: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("l")
          ), [value, this.t.stringLiteral(lifecycleName)]
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
    return this.resolveHTMLSpecificFuncWithDep(nodeName, "a", value, dependencies)
  }

  /**
   * ${nodeName}.a(value);
   */
  private resolveHTMLAddAttributesWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithoutDep(nodeName, "a", value)
  }

  /**
   * ${nodeName}._$addStyle(() => ${value}, this, ${dependencies});
   */
  private resolveHTMLAddStyleWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithDep(nodeName, "s", value, dependencies)
  }

  /**
   * ${nodeName}._$addStyle(value);
   */
  private resolveHTMLAddStyleWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithoutDep(nodeName, "s", value)
  }

  /**
   * ${nodeName}._$addClassName(() => ${value}, this, ${dependencies});
   */
  private resolveHTMLAddClassNameWithDep(nodeName: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithDep(nodeName, "c", value, dependencies)
  }

  /**
   * ${nodeName}._$addClassName(value);
   */
  private resolveHTMLAddClassNameWithoutDep(nodeName: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncWithoutDep(nodeName, "c", value)
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
   * ${nodeName}.e("${key}", () => ${value}, this, ${dependencies});
   */
  private resolveHTMLAddEventWithDep(nodeName: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncKeyWithDep(nodeName, key, "e", value, dependencies)
  }

  /**
   * ${nodeName}.e("${key}", value);
   */
  private resolveHTMLAddEventWithoutDep(nodeName: string, key: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncKeyWithoutDep(nodeName, key, "e", value)
  }

  /**
   * ${nodeName}.p("${key}", () => ${value}, this, ${dependencies});
   */
  private resolveHTMLAddPropWithDep(nodeName: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return this.resolveHTMLSpecificFuncKeyWithDep(nodeName, key, "p", value, dependencies)
  }

  /**
   * ${nodeName}.p("${key}", value);
   */
  private resolveHTMLAddPropWithoutDep(nodeName: string, key: string, value: t.Expression): t.Statement[] {
    return this.resolveHTMLSpecificFuncKeyWithoutDep(nodeName, key, "p", value)
  }

  /**
   * ${nodeName}._$nodes = (() => {
   *  ${children}
   * })())
   */
  private resolveHTMLChildren(nodeName: string, children: ViewParserUnit[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$nodes")
          ),
          this.t.callExpression(
            this.t.arrowFunctionExpression([], this.generateView(children)),
            []
          )
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
    collect(this.declareDLNode(nodeName, "i"))

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
    collect(this.declareDLNode(nodeName, "f"))

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
      let keyDepNotToInclude: string | undefined
      if (this.t.isIdentifier(key)) {
        // ---- Remove key from dependencies,
        //      because when key is updated, the for loop will be updated.
        //      so no need to update items.
        keyDepNotToInclude = key.name
      }
      const identifierToDepsMap = {
        ...this.identifierToDepsMap,
        ...identifierInItem.reduce((acc, id) => (
          keyDepNotToInclude === id
            ? acc
            : {
                ...acc,
                [id]: dependencies
              }), {})
      }

      const forBody = this.generateView(viewParserUnit.children, identifierToDepsMap)
      const itemStatements = this.t.isIdentifier(item)
        ? this.resolveForItemUpdateSimpleIdentifier(item)
        : this.resolveForItemUpdateComplexObject(item)

      // ---- _$addNodeFunc
      collect(
        this.resolveForMainNodeFuncWithDep(nodeName, item, itemStatements, forBody, dependencies)
      )

      // ---- _$addKeyFunc
      if (key) collect(this.resolveForKeyFunc(nodeName, item, key))

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
   * const $uf = () => {
   *  ${item} = nodeFor.i($k, $i);
   * }
   */
  private resolveForItemUpdateSimpleIdentifier(item: t.Identifier): t.Statement[] {
    return [
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier("$uf"),
            this.t.arrowFunctionExpression([],
              this.t.blockStatement([
                this.t.expressionStatement(
                  this.t.assignmentExpression(
                    "=",
                    item,
                    this.t.callExpression(
                      this.t.memberExpression(
                        this.t.identifier(`${this.nodeNamePrefix}For`),
                        this.t.identifier("i")
                      ), [
                        this.t.identifier("$k"),
                        this.t.identifier("$i")
                      ]
                    )
                  )
                )
              ])
            )
          )
        ]
      )
    ]
  }

  /**
   * const $uf = () => {
   *  const $v = (() => {
   *    const {item} = nodeFor.i($k, $i);
   *    return { {each in item.keys }: item[each]}
   *  })()
   *  ${each} = ${each in $v};
   * }
   */
  private resolveForItemUpdateComplexObject(item: t.LVal): t.Statement[] {
    const identifiersInItem = this.getIdentifiers(item)

    return [
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier("$uf"),
            this.t.arrowFunctionExpression([],
              this.t.blockStatement([
                this.t.variableDeclaration(
                  "const", [
                    this.t.variableDeclarator(
                      this.t.identifier("$v"),
                      this.t.callExpression(
                        this.t.arrowFunctionExpression([],
                          this.t.blockStatement([
                            this.t.variableDeclaration(
                              "const", [
                                this.t.variableDeclarator(
                                  item,
                                  this.t.callExpression(
                                    this.t.memberExpression(
                                      this.t.identifier(`${this.nodeNamePrefix}For`),
                                      this.t.identifier("i")
                                    ), [
                                      this.t.identifier("$k"),
                                      this.t.identifier("$i")
                                    ]
                                  )
                                )
                              ]
                            ),
                            this.t.returnStatement(
                              this.t.objectExpression(
                                identifiersInItem.map(id => (
                                  this.t.objectProperty(
                                    this.t.identifier(id),
                                    this.t.identifier(id),
                                    false,
                                    true
                                  )
                                ))
                              )
                            )
                          ])
                        ), []
                      )
                    )
                  ]
                ),
                ...identifiersInItem.map(idName => (
                  this.t.expressionStatement(
                    this.t.assignmentExpression(
                      "=",
                      this.t.identifier(idName),
                      this.t.memberExpression(
                        this.t.identifier("$v"),
                        this.t.identifier(idName)
                      )
                    )
                  )
                ))
              ])
            )
          )
        ]
      )
    ]
  }

  /**
   * ${nodeName}.nodeFunc = (${item}, $i, $k, nodeFor) => {
   *  ${itemStatements}
   *  this._$addDeps(${dependencies}, updateFunc)
   *  ${forBody.body}
   *  this._$addCleanUpDep($uf, Array.isArray(_$node0) ? _$node0[0] : _$node0)
   * }
   */
  private resolveForMainNodeFuncWithDep(nodeName: string, item: t.LVal, itemBody: t.Statement[], forBody: t.BlockStatement, dependencies: IdentifierToDepNode[]): t.Statement[] {
    if (this.leftValCheck(item)) return []
    // ---- If no nodes in forBody, return "return []"
    if (forBody.body.length === 0) {
      return [
        this.t.returnStatement(
          this.t.arrayExpression()
        )
      ]
    }
    // ---- The reason to split add and delete deps is to make the dep order right
    //      because we need the updateFunc to be called before the forBody
    //      but to be removed after the forBody
    return [
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("nodeFunc")
          ),
          this.t.arrowFunctionExpression([
            item,
            this.t.identifier("$i"),
            this.t.identifier("$k"),
            this.t.identifier(`${this.nodeNamePrefix}For`)
          ], this.t.blockStatement([
            ...itemBody,
            this.t.expressionStatement(
              this.t.callExpression(
                this.t.memberExpression(
                  this.t.thisExpression(),
                  this.t.identifier("_$addDeps")
                ), [
                  this.t.arrayExpression(dependencies),
                  this.t.identifier("$uf")
                ]
              )
            ),
            // ---- Non-return statements
            ...forBody.body.slice(0, -1),
            // ---- Cleanup deps
            this.t.expressionStatement(
              this.t.callExpression(
                this.t.memberExpression(
                  this.t.thisExpression(),
                  this.t.identifier("_$addCleanUpDep")
                ), [
                  this.t.identifier("$uf"),
                  this.t.conditionalExpression(
                    this.t.callExpression(
                      this.t.memberExpression(
                        this.t.identifier("Array"),
                        this.t.identifier("isArray")
                      ), [
                        this.t.identifier(`${this.nodeNamePrefix}0`)
                      ]
                    ),
                    this.t.memberExpression(
                      this.t.identifier(`${this.nodeNamePrefix}0`),
                      this.t.numericLiteral(0),
                      true
                    ),
                    this.t.identifier(`${this.nodeNamePrefix}0`)
                  )
                ]
              )
            ),
            // ---- Return statement
            forBody.body[forBody.body.length - 1]
          ])
          )
        )
      )
    ]
  }

  /**
   * ${nodeName}.keyFunc = arr => (
   *   arr.map(${item} => ${key})
   * )
   */
  private resolveForKeyFunc(nodeName: string, item: t.LVal, key: t.Expression): t.Statement[] {
    if (this.leftValCheck(item)) return []

    return [
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("keyFunc")
          ),
          this.t.arrowFunctionExpression([
            this.t.identifier("arr")
          ], this.t.blockStatement([
            this.t.returnStatement(
              this.t.callExpression(
                this.t.memberExpression(
                  this.t.identifier("arr"),
                  this.t.identifier("map")
                ), [
                  this.t.arrowFunctionExpression([item], key)
                ]
              )
            )
          ])
          )
        )
      )
    ]
  }

  /**
   * ${nodeName}.arrayFunc = () => (${array})
   * ${nodeName}.dlScope = this
   * ${nodeName}.dependencies = ${dependencies});
   */
  private resolveForArrayFunc(nodeName: string, array: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("dlScope")
          ),
          this.t.thisExpression()
        )
      ),
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("arrayFunc")
          ),
          this.t.arrowFunctionExpression([], array)
        )
      ),
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("dependencies")
          ),
          this.t.arrayExpression(dependencies)
        )
      )
    ]
  }

  /**
   * this._$nodes = ${array}.map(${item} => {
   *    ${children}
   *  }).flat(1)
   */
  private resolveForMainNodeFuncWithoutDep(nodeName: string, array: t.Expression, item: t.LVal, forBody: t.BlockStatement): t.Statement[] {
    if (this.leftValCheck(item)) return []
    return [
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$nodes")
          ),
          this.t.callExpression(
            this.t.memberExpression(
              this.t.callExpression(
                this.t.memberExpression(
                  array,
                  this.t.identifier("map")
                ), [
                  this.t.arrowFunctionExpression([item], forBody)
                ]
              ),
              this.t.identifier("flat")
            )
            , [this.t.numericLiteral(1)]
          )
        )
      )
    ]
  }

  /* ---- Expression Unit ---- */
  /**
   * @Exp
   * @param viewParserUnit
   * @returns
   */
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
      this.declareDLNode(nodeName, this.t.identifier("e"), [
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

    collect(this.declareDLNode(nodeName, "v"))
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
   * ${nodeName}._$nodes = ((() => {
   *  ${children}
   * }())
   */
  private resolveEnvChildren(nodeName: string, children: ViewParserUnit[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$nodes")
          ),
          this.t.callExpression(
            this.t.arrowFunctionExpression([], this.generateView(children)),
            []
          )
        )
      )
    ]
  }

  /**
   * ${nodeName}.p("${key}", () => (${value}), this, ${dependencies});
   */
  private resolveEnvAddPropWithDep(nodeName: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("p")
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
   * ${nodeName}.p("${key}", ${value});
   */
  private resolveEnvAddPropWithoutDep(nodeName: string, key: string, value: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("p")
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
   * @Subview
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
    const passProps: Array<{ key: string, dependencies: IdentifierToDepNode[], value: t.Expression }> = []

    // ---- Props
    props.forEach(([key, value]) => {
      const dependencies = this.generateDependencyNodes(value)
      if (dependencies.length > 0) {
        collect(this.addSubViewDeps(keyId, key, value, dependencies))
      }
      passProps.push({ key, dependencies, value })
    })

    // ---- Call sub view
    collect(this.callSubView(keyId, nodeName, viewParserUnit.tag, passProps))

    // ---- Delete deps
    passProps.forEach(({ key, dependencies }) => {
      if (dependencies.length > 0) {
        collect(this.cleanUpSubViewDeps(keyId, key, nodeName))
      }
    })

    return statements
  }

  /**
   * const ${key}$${id} = [${value}, ${dependencies}];
   * const $suf$${key}$${id} = this._$updateSubview.bind(this, ${key}$${id}, () => ${value})
   * this._$addDeps(${key}$${id}[1], $suf);
   */
  private addSubViewDeps(id: string, key: string, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier(`${key}$${id}`),
            this.t.arrayExpression([
              value,
              this.t.arrayExpression(dependencies)
            ])
          )
        ]
      ),
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier(`$suf$${key}$${id}`),
            this.t.callExpression(
              this.t.memberExpression(
                this.t.memberExpression(
                  this.t.thisExpression(),
                  this.t.identifier("_$updateSubview")
                ),
                this.t.identifier("bind")
              ), [
                this.t.thisExpression(),
                this.t.identifier(`${key}$${id}`),
                this.t.arrowFunctionExpression([], value)
              ]
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
            this.t.memberExpression(
              this.t.identifier(`${key}$${id}`),
              this.t.numericLiteral(1),
              true
            ),
            this.t.identifier(`$suf$${key}$${id}`)
          ]
        )
      )
    ]
  }

  /**
   * const nodeName = ${subView}({ [${key}: ${key}$${id}] })
   */
  private callSubView(id: string, nodeName: string, tag: t.Expression, props: Array<{ key: string, dependencies: IdentifierToDepNode[], value: t.Expression }>): t.Statement[] {
    return [
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier(nodeName),
            this.t.callExpression(
              tag, [
                this.t.objectExpression(props.map(({ key, dependencies, value }) => (
                  this.t.objectProperty(
                    this.t.identifier(key),
                    dependencies.length > 0
                      ? this.t.identifier(`${key}$${id}`)
                      : this.t.arrayExpression([value])
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
   * this._$addCleanUpDep($suf$${key}$${id}, ${nodeName}[0]);
   */
  private cleanUpSubViewDeps(id: string, key: string, nodeName: string): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier("_$addCleanUpDep")
          ), [
            this.t.identifier(`$suf$${key}$${id}`),
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
        collect(this.resolveCustomAddPropWithDep(nodeName, null, content, dependencies))
      } else {
        collect(this.resolveCustomAddPropWithoutDep(nodeName, null, content))
      }
    }

    // ---- Props
    this.preHandleProps(viewParserUnit.props).forEach(([key, value]) => {
      if (key === "do") return collect(this.resolveCustomDo(nodeName, value))
      if (key === "forwardProps") return collect(this.resolveCustomForwardProps(nodeName))
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
   *  or
   * ${nodeName}._$addProp(this._$contentProp ?? "_$content", ${value}, () => (${value}), this, ${dependencies});
   */
  private resolveCustomAddPropWithDep(nodeName: string, key: string | null, value: t.Expression, dependencies: IdentifierToDepNode[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addProp")
          ), [
            key
              ? this.t.stringLiteral(key)
              : this.t.logicalExpression("??",
                this.t.memberExpression(
                  this.t.thisExpression(),
                  this.t.identifier("_$contentProp")
                ),
                this.t.stringLiteral("_$content")
              ),
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
   *  or
   * ${nodeName}._$addProp(this._$contentProp, ${value});
   */
  private resolveCustomAddPropWithoutDep(nodeName: string, key: string | null, value: t.Expression): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$addProp")
          ), [
            key
              ? this.t.stringLiteral(key)
              : this.t.memberExpression(
                this.t.thisExpression(),
                this.t.identifier("_$contentProp")
              ),
            value
          ]
        )
      )
    ]
  }

  /**
   * ${nodeName}._$childrenFunc = () => ${children}
   */
  private resolveCustomChildren(nodeName: string, children: ViewParserUnit[]): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier(nodeName),
            this.t.identifier("_$childrenFunc")
          ),
          this.t.arrowFunctionExpression([], this.generateView(children))
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

    const wrappedNode = this.valueWrapper(node)
    this.classRootPath.scope.traverse(wrappedNode, {
      MemberExpression: innerPath => {
        if (!this.t.isIdentifier(innerPath.node.property)) return
        const propertyKey = innerPath.node.property.name
        if (
          this.availableProperties.includes(propertyKey) &&
          this.t.isThisExpression(innerPath.node.object) &&
          !isMemberInEscapeFunction(innerPath, wrappedNode, this.t) &&
          !isMemberInManualFunction(innerPath, wrappedNode, this.t) &&
          !isAssignmentExpressionLeft(innerPath, this.t) &&
          !isAssignmentExpressionRight(innerPath, wrappedNode, this.t)
        ) {
          deps.add(propertyKey)
          this.fullDepMap[propertyKey]?.forEach(deps.add.bind(deps))
        }
      }
    })

    return [...deps].map(dep => this.t.stringLiteral(`$${dep}Deps`))
  }

  /**
   * @brief Generate implicit dependency nodes for specific scenarios like ForNode and SubView
   * @param node
   * @returns dependency nodes
   */
  private getIdentifierDependencyNodes(node: t.Expression): IdentifierToDepNode[] {
    const deps = new Set<IdentifierToDepNode>()

    const wrappedNode = this.valueWrapper(node)
    this.classRootPath.scope.traverse(wrappedNode, {
      Identifier: innerPath => {
        const identifier = innerPath.node
        const idName = identifier.name
        if (this.isAttrFromFunction(this.classRootPath, idName, node)) return
        const depsArray = this.identifierToDepsMap[idName]
        if (!depsArray) return
        if (
          !isMemberInEscapeFunction(innerPath, wrappedNode, this.t) &&
          !isMemberInManualFunction(innerPath, wrappedNode, this.t)
        ) {
          depsArray.forEach(deps.add.bind(deps))
        }
      }
    })

    return [...deps]
  }

  /* ---- Helper Functions ---- */
  /**
   * @brief Declare a DLNode
   *  const ${dlNodeId} = new $${nodeName}()
   * @param dlNodeId
   * @param nodeName
   * @returns
   */
  private declareDLNode(dlNodeName: string, nodeName: string) {
    return this.t.variableDeclaration(
      "const", [
        this.t.variableDeclarator(
          this.t.identifier(dlNodeName),
          this.t.newExpression(
            this.t.identifier(`$${nodeName}`), []
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
      this.availableProperties,
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

  /**
   * This function should never return true, or IanDx to blame
   * @param node
   * @returns
   */
  private leftValCheck(node: t.Node): node is (
    t.MemberExpression
    | t.ArrayExpression
    | t.BinaryExpression
    | t.TSAsExpression
    | t.TSTypeAssertion
    | t.TSSatisfiesExpression
    | t.TSNonNullExpression
    | t.TSParameterProperty
  ) {
    return (
      this.t.isMemberExpression(node) ||
      this.t.isArrayExpression(node) ||
      this.t.isBinaryExpression(node) ||
      this.t.isTSAsExpression(node) ||
      this.t.isTSTypeAssertion(node) ||
      this.t.isTSSatisfiesExpression(node) ||
      this.t.isTSNonNullExpression(node) ||
      this.t.isTSParameterProperty(node)
    )
  }
}

/**
 * @brief Offer generator changing for inheriting usage
 */
let ViewGeneratorClass = ViewGenerator
export function changeViewGeneratorClass(newClass: typeof ViewGenerator) {
  ViewGeneratorClass = newClass
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
  availableProperties: string[],
  subViewNames: string[],
  identifierToDepsMap: Record<string, IdentifierToDepNode[]>
): [t.BlockStatement, string[]] {
  const viewGenerator = new ViewGeneratorClass(
    types,
    viewParserResult,
    classRootPath,
    fullDepMap,
    availableProperties,
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
