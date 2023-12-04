import { geneDeps, geneIdDeps, uid, resolveForBody, isHTMLTag, parseCustomTag, isSubViewTag, isOnlyMemberExpression, isTagName, getForBodyIdentifiers, valueWrapper } from "./generatorHelper"
import * as t from "@babel/types"
import { type ViewParserUnit } from "./viewParser"

function nodeGeneration(nodeName: string, nodeType: t.Expression, args: Array<t.ArgumentPlaceholder | t.SpreadElement | t.Expression>) {
  return t.variableDeclaration(
    "const", [
      t.variableDeclarator(
        t.identifier(nodeName),
        t.newExpression(
          t.memberExpression(
            t.identifier("DLight"),
            nodeType
          ), args
        )
      )
    ]
  )
}

export type IdDepsArr = Array<{ ids: string[], propNames: t.Node[] }>
export class Generator {
  depChain: string[]
  subViews: string[]
  // ---- 通过对应拿到deps，比如 监听this.apples导致的apple变化 {ids: [apple], propNames: [this.apples]}
  idDepsArr: IdDepsArr = []

  fullDepMap: Record<string, string[]>
  usedProperties: string[] = []

  path: any

  constructor(
    path: any,
    depChain: string[],
    subViews: string[],
    fullDepMap: Record<string, string[]>,
    idDepsArr: IdDepsArr = []
  ) {
    this.path = path
    this.depChain = depChain
    this.subViews = subViews
    this.fullDepMap = fullDepMap
    this.idDepsArr = idDepsArr
  }

  generate(viewParserResult: ViewParserUnit[]) {
    const bodyStatements: t.Statement[] = []
    for (const [idx, child] of viewParserResult.entries()) {
      bodyStatements.push(...this.resolveParserNode(child, idx))
    }
    /**
     * body.add(`return ${geneChildNodesArray(viewParserResult)};`)
     */
    bodyStatements.push(
      t.returnStatement(
        t.arrayExpression(
          viewParserResult.map((viewParserUnit, idx) => {
            if (viewParserUnit.attr.isSubView) return t.spreadElement(t.identifier(`_$node${idx}`))
            return t.identifier(`_$node${idx}`)
          })
        )
      )
    )
    this.usedProperties = [...new Set(this.usedProperties)]
    return t.blockStatement(bodyStatements)
  }

  geneDeps(value: t.Node) {
    const deps: t.Node[] = [...new Set([
      ...geneDeps(this.path, value, this.depChain, this.fullDepMap),
      ...geneIdDeps(this.path, value, this.idDepsArr)
    ])]
    // deps 有可能是subview的 ...xxx.deps
    this.usedProperties.push(...deps.filter(node => t.isStringLiteral(node)).map(node => (node as any).value))
    return deps as any
  }

  resolveParserNode(viewParserUnit: ViewParserUnit, idx: number) {
    if (isSubViewTag(this.subViews, viewParserUnit)) return this.resolveSubView(viewParserUnit, idx)
    if (viewParserUnit.tag === "_$exp") return this.resolveExpression(viewParserUnit, idx)
    if (isTagName(viewParserUnit, "env")) return this.resolveEnv(viewParserUnit, idx)
    if (viewParserUnit.tag === "_$if") return this.resolveIf(viewParserUnit, idx)
    if (viewParserUnit.tag === "_$for") return this.resolveFor(viewParserUnit, idx)
    if (viewParserUnit.tag === "_$text") return this.resolveText(viewParserUnit, idx)
    if (isHTMLTag(viewParserUnit)) return this.resolveHTML(viewParserUnit, idx)
    parseCustomTag(viewParserUnit)
    return this.resolveCustom(viewParserUnit, idx)
  }

  resolveIf(viewParserUnit: ViewParserUnit, idx: number) {
    const statements: t.Statement[] = []
    const nodeName = `_$node${idx}`

    /**
     * const ${nodeName} = new DLight.IfNode();
     */
    statements.push(
      nodeGeneration(nodeName, t.identifier("IfNode"), [])
    )

    for (const condition of viewParserUnit.attr.conditions) {
      const listenDeps = this.geneDeps(condition.condition)
      if (listenDeps.length > 0) {
        /**
         * ${nodeName}._$addCond(() => ${condition.condition}, () => {
         *  ${children}
         * }, this, deps)
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier("_$addCond")
              ), [
                t.arrowFunctionExpression(
                  [], condition.condition
                ),
                t.arrowFunctionExpression(
                  [], this.generate(condition.viewParserResult)
                ),
                t.thisExpression(),
                t.arrayExpression(listenDeps)
              ]
            )
          )
        )
        continue
      }
      /**
         * ${nodeName}._$addCond(() => ${condition.condition}, () => {
         *  ${children}
         * })
         */
      statements.push(
        t.expressionStatement(
          t.callExpression(
            t.memberExpression(
              t.identifier(nodeName),
              t.identifier("_$addCond")
            ), [
              t.arrowFunctionExpression(
                [], condition.condition
              ),
              t.arrowFunctionExpression(
                [], this.generate(condition.viewParserResult)
              )
            ]
          )
        )
      )
    }

    return statements
  }

  resolveFor(viewParserUnit: ViewParserUnit, idx: number) {
    const statements: t.Statement[] = []
    const key = viewParserUnit.attr.key
    const item = viewParserUnit.attr.item
    const array = viewParserUnit.attr.array

    const nodeName = `_$node${idx}`

    /**
     * const ${nodeName} = new DLight.ForNode();
     */
    statements.push(
      nodeGeneration(nodeName, t.identifier("ForNode"), [])
    )

    const listenDeps = this.geneDeps(array)
    if (listenDeps.length > 0) {
      // ---- 如果有dependencies
      const idArr = getForBodyIdentifiers(this.path, item)
      const valueId = uid()
      const valueItemStr = `_$valuedItem${valueId}`
      // ---- 子body
      const newGenerator = new Generator(this.path, this.depChain, this.subViews, this.fullDepMap,
        [...this.idDepsArr, { ids: idArr, propNames: listenDeps }])
      const forBody = newGenerator.generate(viewParserUnit.children)
      this.usedProperties.push(...newGenerator.usedProperties)

      let redeclareBody: any[]
      let updateFuncBody: any
      if (t.isIdentifier(item)) {
        redeclareBody = [
          /**
           * let ${item} = node_for._$getItem(_$key, _$idx);
           */
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
          )
        ]
        updateFuncBody = (
          /**
           * const updateFunc = () => (
           *  ${item} = node_for._$getItem(_$key, _$idx)
           * )
           */
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
        )
      } else {
        resolveForBody(this.path, forBody, item, valueItemStr)
        // ---- 前面的listen函数很复杂，主旨就是把 let {idx, item} of array
        //      变成 let {idx.value, item.value} of array
        redeclareBody = [
          /**
           * const ${item} = node_for._$getItem(_$key, _$idx);
           */
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
          /**
           * const ${valueItemStr} = {i, item, xxx};
           */
          t.variableDeclaration(
            "const", [
              t.variableDeclarator(
                t.identifier(valueItemStr),
                t.objectExpression(
                  idArr.map((idItem: string) => (
                    t.objectProperty(
                      t.identifier(idItem),
                      t.identifier(idItem),
                      undefined,
                      true
                    )
                  ))
                )
              )
            ]
          )
        ]
        updateFuncBody = (
          /**
           * const updateFunc = () => {
           *  ...
           * }
           */
          t.variableDeclaration(
            "const", [
              t.variableDeclarator(
                t.identifier("updateFunc"),
                t.arrowFunctionExpression(
                  [],
                  t.blockStatement([
                    /**
                     * const ${item} = node_for._$getItem(_$key, _$idx
                     */
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
                    /**
                      *  for (const i of idArr) {
                      *    ${valueItemStr}.${i} = ${i};
                      *  }
                      */
                    ...idArr.map((idItem: string) => (
                      t.expressionStatement(
                        t.assignmentExpression(
                          "=",
                          t.memberExpression(
                            t.identifier(valueItemStr),
                            t.identifier(idItem)
                          ),
                          t.identifier(idItem)
                        )
                      )
                    ))
                  ])
                )
              )
            ]
          )
        )
      }

      /**
       * ${nodeName}._$addNodeFunc((_$key, _$idx, node_for) => {
       * })
       */
      statements.push(
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
                ...redeclareBody,
                updateFuncBody,
                /**
                 * this._$addDeps(${depStr}, updateFunc)
                 */
                t.expressionStatement(
                  t.callExpression(
                    t.memberExpression(
                      t.thisExpression(),
                      t.identifier("_$addDeps")
                    ), [
                      t.arrayExpression(listenDeps),
                      t.identifier("updateFunc")
                    ]
                  )
                ),
                ...forBody.body.slice(0, -1),
                // ---- The reason to split add and delete deps is to make the dep order right
                /**
                 * this._$deleteDeps(depsStr, updateFunc, Array.isArray(_$node0) ? _$node0[0] : _$node0);
                 **/
                t.expressionStatement(
                  t.callExpression(
                    t.memberExpression(
                      t.thisExpression(),
                      t.identifier("_$deleteDeps")
                    ), [
                      t.arrayExpression(listenDeps),
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
                forBody.body[forBody.body.length - 1]
              ]))
            ]
          )
        )
      )

      // ---- 第二个参数，keyFunc
      if (key) {
        /**
         * ${nodeName}._$addKeyFunc(() => { })
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier("_$addKeyFunc")
              ), [
                t.arrowFunctionExpression(
                  [],
                  t.blockStatement([
                  /**
                   * const keys = []
                   */
                    t.variableDeclaration(
                      "const", [
                        t.variableDeclarator(
                          t.identifier("keys"),
                          t.arrayExpression()
                        )
                      ]
                    ),
                    /**
                   * for (let ${item} of ${array}) {
                   *   keys.push(${key});
                   * }
                   */
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
                    /**
                   * return keys
                   */
                    t.returnStatement(t.identifier("keys"))
                  ])
                )
              ]
            )
          )
        )
      }
      /**
       * ${nodeName}._$addArrayFunc(this, () => (${array}), ${geneDepsStr(listenDeps)});
       */
      statements.push(
        t.expressionStatement(
          t.callExpression(
            t.memberExpression(
              t.identifier(nodeName),
              t.identifier("_$addArrayFunc")
            ), [
              t.thisExpression(),
              t.arrowFunctionExpression([], array),
              t.arrayExpression(listenDeps)
            ]
          )
        )
      )
    } else {
      /**
       * ${nodeName}._$addNodess(() => Array.from(${array}).map((${item}) => (() => {
       *   ${children}
       * })()));
       */
      statements.push(
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
                      this.generate(viewParserUnit.children)
                    )
                  ]
                )
              )
            ]
          )
        )
      )
    }
    return statements
  }

  resolveText(viewParserUnit: ViewParserUnit, idx: number) {
    const value = viewParserUnit.attr._$content
    const listenDeps = this.geneDeps(value)
    const nodeName = `_$node${idx}`
    const statements: t.Statement[] = []

    if (listenDeps.length > 0) {
      /**
       * const ${nodeName} = new DLight.TextNode(() => ${value}, this, ${geneDepsStr(listenDeps)});
       */
      statements.push(
        nodeGeneration(nodeName, t.identifier("TextNode"), [
          t.arrowFunctionExpression([], value),
          t.thisExpression(),
          t.arrayExpression(listenDeps)
        ])
      )
    } else {
      /**
       * const ${nodeName} = new DLight.TextNode(${value})
       */
      statements.push(
        nodeGeneration(nodeName, t.identifier("TextNode"), [value])
      )
    }

    return statements
  }

  resolveHTML(viewParserUnit: ViewParserUnit, idx: number) {
    const statements: t.Statement[] = []
    const nodeName = `_$node${idx}`
    /**
     * const ${nodeName} = new DLight.HtmlNode(${viewParserUnit.tag})
     */
    statements.push(
      nodeGeneration(nodeName, t.identifier("HtmlNode"), [viewParserUnit.tag as any])
    )

    // ---- properties
    for (let [key, { value, nodes }] of Object.entries<any>(viewParserUnit.attr.props)) {
      this.parsePropNodes(value, nodes)
      if (key === "do") {
        /**
         * (${value})(${nodeName});
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              value, [t.identifier(nodeName)]
            )
          )
        )
        continue
      }
      if (key === "forwardProps") {
        /**
         * this.forwardProps(${nodeName});
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.thisExpression(),
                t.identifier("forwardProps")
              ), [t.identifier(nodeName)]
            )
          )
        )
        continue
      }
      if (["willAppear", "didAppear", "willDisappear", "didDisappear"].includes(key)) {
        /**
         * ${nodeName}._$addLifeCycle(${value}, "${key}");
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier("_$addLifeCycle")
              ), [
                value,
                t.stringLiteral(key)
              ]
            )
          )
        )
        continue
      }
      let listenDeps = this.geneDeps(value)
      if (key === "element") {
        if (t.isMemberExpression(value) && t.isThisExpression(value.object) && t.isIdentifier(value.property)) {
          listenDeps = listenDeps.filter((node: any) => (
            !t.isStringLiteral(node) ||
            (t.isStringLiteral(node) && node.value !== (value.property as t.Identifier).name)
          ))
        }
        if (isOnlyMemberExpression(value)) {
          /**
           * const ${nodeName}Element = () => typeof ${value} === "function" ? (${value})(${nodeName}._$el) : ${value} = ${nodeName}._$el;
           */
          statements.push(
            t.variableDeclaration(
              "const", [
                t.variableDeclarator(
                  t.identifier(`${nodeName}Element`),
                  t.arrowFunctionExpression(
                    [],
                    t.conditionalExpression(
                      t.binaryExpression(
                        "===",
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
                      t.assignmentExpression(
                        "=",
                        value,
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
        } else {
          /**
           * const ${nodeName}Element = () => (${value})(${nodeName}._$el)
           */
          statements.push(
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
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.identifier(`${nodeName}Element`),
              []
            )
          )
        )

        if (listenDeps.length > 0) {
          /**
         * this._$addDeps(${geneDepsStr(listenDeps)}, ${nodeName}Element, ${nodename})
         */
          statements.push(
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.thisExpression(),
                  t.identifier("_$addDeps")
                ), [
                  t.arrayExpression(listenDeps),
                  t.identifier(`${nodeName}Element`),
                  t.identifier(nodeName)
                ]
              )
            )
          )
        }
        continue
      }
      if (key === "_$content") {
        key = "innerText"
      }
      const nonPropertyFuncMap = {
        addEvents: "_$addEvents",
        setAttributes: "_$addAttributes",
        style: "_$addStyle",
        className: "_$addClassName"
      }
      let funcName = "_$addProp"
      if (Object.keys(nonPropertyFuncMap).includes(key)) {
        funcName = (nonPropertyFuncMap as any)[key]
        if (listenDeps.length > 0) {
          /**
           * ${nodeName}.${funcName}(() => ${value}, this, ${geneDepsStr(listenDeps)});
           */
          statements.push(
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.identifier(nodeName),
                  t.identifier(funcName)
                ), [
                  t.arrowFunctionExpression([], value),
                  t.thisExpression(),
                  t.arrayExpression(listenDeps)
                ]
              )
            )
          )
          continue
        }
        /**
         * ${nodeName}.${funcName}(value);
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier(funcName)
              ), [
                value
              ]
            )
          )
        )
        continue
      }
      if (key.startsWith("on")) {
        key = key.slice(2)
        funcName = "_$addEvent"
      }
      if (listenDeps.length > 0) {
        /**
         * ${nodeName}.${funcName}("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)});
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier(funcName)
              ), [
                t.stringLiteral(key),
                t.arrowFunctionExpression([], value),
                t.thisExpression(),
                t.arrayExpression(listenDeps)
              ]
            )
          )
        )
        continue
      }
      /**
       * ${nodeName}.${funcName}("${key}", ${value});
       */
      statements.push(
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

    // ---- children
    if (viewParserUnit.children.length > 0) {
      /**
       * ${nodeName}._$addNodes((() => {
       *  ${children}
       * })())
       */
      statements.push(
        t.expressionStatement(
          t.callExpression(
            t.memberExpression(
              t.identifier(nodeName),
              t.identifier("_$addNodes")
            ), [
              t.callExpression(
                t.arrowFunctionExpression(
                  [],
                  this.generate(viewParserUnit.children)
                ),
                []
              )
            ]
          )
        )
      )
    }

    return statements
  }

  resolveCustom(viewParserUnit: ViewParserUnit, idx: number) {
    const statements: t.Statement[] = []
    const nodeName = `_$node${idx}`

    /**
     * const ${nodeName} = new (${viewParserUnit.tag})();
     */
    statements.push(
      t.variableDeclaration(
        "const", [
          t.variableDeclarator(
            t.identifier(nodeName),
            t.newExpression(viewParserUnit.tag as any, [])
          )
        ]
      )
    )

    // ---- props
    for (let [key, { value, nodes }] of Object.entries<any>(viewParserUnit.attr.props)) {
      value = this.parsePropNodes(value, nodes)
      if (key === "do") {
        /**
         * (${value})(${nodeName});
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              value, [t.identifier(nodeName)]
            )
          )
        )
        continue
      }
      if (key === "forwardProps") {
        /**
         * this.forwardProps(${nodeName});
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.thisExpression(),
                t.identifier("forwardProps")
              ), [t.identifier(nodeName)]
            )
          )
        )
        continue
      }
      if (["willMount", "didMount", "willUnmount", "didUnmount"].includes(key)) {
        /**
         * ${nodeName}._$addLifeCycle(${value}, "${key}");
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier("_$addLifeCycle")
              ), [
                value,
                t.stringLiteral(key)
              ]
            )
          )
        )
        continue
      }
      let listenDeps = this.geneDeps(value)
      if (key === "element") {
        // ---- 过滤掉绑定的this.xxEl
        if (t.isMemberExpression(value) && t.isThisExpression(value.object) && t.isIdentifier(value.property)) {
          listenDeps = listenDeps.filter((node: any) => (
            !t.isStringLiteral(node) ||
            (t.isStringLiteral(node) && node.value !== (value.property as t.Identifier).name)
          ))
        }
        if (isOnlyMemberExpression(value)) {
          /**
           * const ${nodeName}Element = () => typeof ${value} === "function" ? (${value})(${nodeName}._$el) : ${value} = ${nodeName}._$el;
           */
          statements.push(
            t.variableDeclaration(
              "const", [
                t.variableDeclarator(
                  t.identifier(`${nodeName}Element`),
                  t.arrowFunctionExpression(
                    [],
                    t.conditionalExpression(
                      t.binaryExpression(
                        "===",
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
                      t.assignmentExpression(
                        "=",
                        value,
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
        } else {
          /**
           * const ${nodeName}Element = () => (${value})(${nodeName}._$el)
           */
          statements.push(
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
         * ${nodeName}._$addLifeCycle(${nodeName}Element);
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier("_$addLifeCycle")
              ), [
                t.identifier(`${nodeName}Element`),
                t.stringLiteral("didMount")
              ]
            )
          )
        )
        if (listenDeps.length > 0) {
          /**
         * this._$addDeps(${geneDepsStr(listenDeps)}, ${nodeName}Element, ${nodeName});
         */
          statements.push(
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.thisExpression(),
                  t.identifier("_$addDeps")
                ), [
                  t.arrayExpression(listenDeps),
                  t.identifier(`${nodeName}Element`),
                  t.identifier(nodeName)
                ]
              )
            )
          )
        }
        continue
      }
      const addPropFuncName = key === "_$content"
        ? "_$addDefaultProp"
        : "_$addProp"
      if (listenDeps.length > 0) {
        /**
         * ${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)})
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier(addPropFuncName)
              ), [
                t.stringLiteral(key),
                t.arrowFunctionExpression([], value),
                t.thisExpression(),
                t.arrayExpression(listenDeps)
              ]
            )
          )
        )
        continue
      }
      /**
       * ${nodeName}._$addProp("${key}", ${value});
       */
      statements.push(
        t.expressionStatement(
          t.callExpression(
            t.memberExpression(
              t.identifier(nodeName),
              t.identifier(addPropFuncName)
            ), [
              t.stringLiteral(key),
              value
            ]
          )
        )
      )
    }

    // ---- child
    if (viewParserUnit.children.length > 0) {
      /**
       * ${nodeName}._$addchildren(() => {
       *  children
       * })
       */
      statements.push(
        t.expressionStatement(
          t.callExpression(
            t.memberExpression(
              t.identifier(nodeName),
              t.identifier("_$addChildren")
            ), [
              t.arrowFunctionExpression(
                [],
                this.generate(viewParserUnit.children)
              )
            ]
          )
        )
      )
    }

    return statements
  }

  resolveSubView(viewParserUnit: ViewParserUnit, idx: number) {
    viewParserUnit.attr.isSubView = true
    const nodeName = `_$node${idx}`
    const statements: t.Statement[] = []
    const props = Object.entries<any>(viewParserUnit.attr.props).map(([key, { value, nodes }]) => {
      value = this.parsePropNodes(value, nodes)
      return { key, value }
    })

    const keyId = uid()
    const passProps: any[] = []
    for (let { key, value } of props) {
      if (key === "_$content") key = "content"
      const keyWithId = `${key}_${keyId}`
      const listenDeps = this.geneDeps(value)
      /**
       * const ${keyWithId} = {value: ${value}, deps: ${depsStr}};
       */
      statements.push(
        t.variableDeclaration(
          "const", [
            t.variableDeclarator(
              t.identifier(keyWithId),
              t.objectExpression([
                t.objectProperty(
                  t.identifier("value"),
                  value
                ),
                t.objectProperty(
                  t.identifier("deps"),
                  t.arrayExpression(listenDeps)
                )
              ])
            )
          ]
        )
      )
      if (listenDeps.length > 0) {
        /**
         * const ${key}UpdateFunc${idx} = () => ${keyWithId}.xx = xx
         **/
        statements.push(
          t.variableDeclaration(
            "const", [
              t.variableDeclarator(
                t.identifier(`${key}UpdateFunc${idx}`),
                t.arrowFunctionExpression(
                  [],
                  t.assignmentExpression(
                    "=",
                    t.memberExpression(
                      t.identifier(keyWithId),
                      t.identifier("value")
                    ),
                    value
                  )
                )
              )
            ]
          )
        )
        /**
         * this._$addDeps(depsStr, ${key}UpdateFunc${idx});
         **/
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.thisExpression(),
                t.identifier("_$addDeps")
              ), [
                t.arrayExpression(listenDeps),
                t.identifier(`${key}UpdateFunc${idx}`)
              ]
            )
          )
        )
      }
      passProps.push({ key, keyWithId, listenDeps })
    }
    /**
     * const nodeName = ${viewParserUnit.tag}({${passProps.map(
     *  ({ key, keyWithId }) => `${key}: ${keyWithId}`
     * ).join(", ")}});
     */
    statements.push(
      t.variableDeclaration(
        "const", [
          t.variableDeclarator(
            t.identifier(nodeName),
            t.callExpression(
              viewParserUnit.tag as t.MemberExpression, [
                t.objectExpression(passProps.map(({ key, keyWithId }) => (
                  t.objectProperty(
                    t.identifier(key),
                    t.identifier(keyWithId)
                  )
                )))
              ]
            )
          )
        ]
      )
    )

    for (const { key, listenDeps } of passProps) {
      if (listenDeps.length > 0) {
        // ---- The reason to split add and delete deps is to make the dep order right
        /**
         * this._$deleteDeps(depsStr, ${key}UpdateFunc${idx}, ${nodeName}[0]);
         **/
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.thisExpression(),
                t.identifier("_$deleteDeps")
              ), [
                t.arrayExpression(listenDeps),
                t.identifier(`${key}UpdateFunc${idx}`),
                t.memberExpression(
                  t.identifier(nodeName),
                  t.numericLiteral(0),
                  true
                )
              ]
            )
          )
        )
      }
    }

    return statements
  }

  resolveEnv(viewParserUnit: ViewParserUnit, idx: number) {
    const nodeName = `_$node${idx}`
    const statements: t.Statement[] = []

    /**
     * const ${nodeName} = new DLight.TextNode()
     */
    statements.push(
      nodeGeneration(nodeName, t.identifier("EnvNode"), [])
    )
    // ---- child 要先加children
    if (viewParserUnit.children.length > 0) {
      /**
       * ${nodeName}._$addNodes((() => {
       *  ${children}
       * })()
       */
      statements.push(
        t.expressionStatement(
          t.callExpression(
            t.memberExpression(
              t.identifier(nodeName),
              t.identifier("_$addNodes")
            ), [
              t.callExpression(
                t.arrowFunctionExpression(
                  [],
                  this.generate(viewParserUnit.children)
                ),
                []
              )
            ]
          )
        )
      )
    }

    // ---- props
    for (let [key, { value, nodes }] of Object.entries<any>(viewParserUnit.attr.props)) {
      value = this.parsePropNodes(value, nodes)
      const listenDeps = this.geneDeps(value)
      if (listenDeps.length > 0) {
        /**
         * ${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)}});
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier("_$addProp")
              ), [
                t.stringLiteral(key),
                t.arrowFunctionExpression([], value),
                t.thisExpression(),
                t.arrayExpression(listenDeps)
              ]
            )
          )
        )
        continue
      }
      /**
       * ${nodeName}._$addProp("${key}", ${value});
       */
      statements.push(
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
      )
    }
    return statements
  }

  resolveExpression(viewParserUnit: ViewParserUnit, idx: number) {
    const statements: t.Statement[] = []
    const nodeName = `_$node${idx}`
    // ---- forward props
    for (let [key, { value, nodes }] of Object.entries<any>(viewParserUnit.attr.props)) {
      value = this.parsePropNodes(value, nodes)
      if (key === "_$content") {
        const listenDeps = this.geneDeps(value)
        if (listenDeps.length > 0) {
          /**
           * const ${nodeName} = new DLight.ExpressionNode(() => ${value}, this, ${geneDepsStr(listenDeps)});
           */
          statements.push(
            nodeGeneration(nodeName, t.identifier("ExpressionNode"), [
              t.arrowFunctionExpression([], value),
              t.thisExpression(),
              t.arrayExpression(listenDeps)
            ])
          )
        } else {
          /**
           * const ${nodeName} = new DLight.ExpressionNode(${value});
           */
          statements.push(
            nodeGeneration(nodeName, t.identifier("ExpressionNode"), [value])
          )
        }
        continue
      }
      if (key === "onUpdateNodes") {
        /**
         * ${nodeName}._$onUpdateNodes(${value});
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier("_$onUpdateNodes")
              ), [value]
            )
          )
        )
        continue
      }

      const listenDeps = this.geneDeps(value)
      if (listenDeps.length > 0 && !["willAppear", "didAppear", "willDisappear", "didDisappear"].includes(key)) {
        /**
         * ${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)});
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier("_$addProp")
              ), [
                t.stringLiteral(key),
                t.arrowFunctionExpression([], value),
                t.thisExpression(),
                t.arrayExpression(listenDeps)
              ]
            )
          )
        )
        continue
      }
      /**
       * ${nodeName}._$addProp("${key}", ${value});
       */
      statements.push(
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
      )
    }

    return statements
  }

  parsePropNodes(value: t.Node, nodes: Record<string, ViewParserUnit[]>) {
    let newValue = value
    const generate = this.generate.bind(this)

    this.path.scope.traverse(valueWrapper(value), {
      StringLiteral(innerPath: any) {
        const id = innerPath.node.value
        const viewParserResult = nodes[id]
        if (!viewParserResult) return
        const newNode = (
          t.callExpression(
            t.arrowFunctionExpression([], generate(viewParserResult)),
            []
          )
        )
        if (value === innerPath.node) newValue = newNode
        innerPath.replaceWith(newNode)
        innerPath.skip()
      }
    })
    return newValue
  }
}

export function resolveParserNode(
  path: any,
  viewParserResult: ViewParserUnit[],
  depChain: string[],
  subViews: string[],
  fullDepMap: Record<string, string[]>,
  idDepsArr: IdDepsArr = []
) {
  const generator = new Generator(path, depChain, subViews, fullDepMap, idDepsArr)
  const code = generator.generate(viewParserResult)
  return {
    code,
    usedProperties: generator.usedProperties
  }
}
