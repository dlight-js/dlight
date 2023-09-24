import { type ParserNode } from "./parser"
import { geneDeps, geneIdDeps, uid, resolveForBody, isHTMLTag, parseCustomTag, isSubViewTag, isOnlyMemberExpression, isTagName, getForBodyIdentifiers, valueWrapper } from "./generatorHelper"
import * as t from "@babel/types"

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

  usedProperties: string[] = []

  path: any

  constructor(path: any, depChain: string[], subViews: string[], idDepsArr: IdDepsArr = []) {
    this.path = path
    this.depChain = depChain
    this.subViews = subViews
    this.idDepsArr = idDepsArr
  }

  generate(parserNodes: ParserNode[]) {
    const bodyStatements: t.Statement[] = []
    for (const [idx, child] of parserNodes.entries()) {
      bodyStatements.push(...this.resolveParserNode(child, idx))
    }
    /**
     * body.add(`return ${geneChildNodesArray(parserNodes)};`)
     */
    bodyStatements.push(
      t.returnStatement(
        t.arrayExpression(
          parserNodes.map((parserNode, idx) => {
            if (parserNode.attr.isSubView) return t.spreadElement(t.identifier(`_$node${idx}`))
            return t.identifier(`_$node${idx}`)
          })
        )
      )
    )
    this.usedProperties = [...new Set(this.usedProperties)]
    return t.blockStatement(bodyStatements)
  }

  geneDeps(value: t.Node) {
    const deps: t.Node[] = [...new Set([...geneDeps(this.path, value, this.depChain), ...geneIdDeps(this.path, value, this.idDepsArr)])]
    // deps 有可能是subview的 ...xxx.deps
    this.usedProperties.push(...deps.filter(node => t.isStringLiteral(node)).map(node => (node as any).value))
    return deps as any
  }

  resolveParserNode(parserNode: ParserNode, idx: number) {
    if (isSubViewTag(this.subViews, parserNode)) return this.resolveSubView(parserNode, idx)
    if (isTagName(parserNode, "_")) return this.resolveExpression(parserNode, idx)
    if (isTagName(parserNode, "env")) return this.resolveEnv(parserNode, idx)
    if (parserNode.tag === "if") return this.resolveIf(parserNode, idx)
    if (parserNode.tag === "for") return this.resolveFor(parserNode, idx)
    if (parserNode.tag === "_$text") return this.resolveText(parserNode, idx)
    if (isHTMLTag(parserNode)) return this.resolveHTML(parserNode, idx)
    parseCustomTag(parserNode)
    return this.resolveCustom(parserNode, idx)
  }

  resolveIf(parserNode: ParserNode, idx: number) {
    const statements: t.Statement[] = []
    const nodeName = `_$node${idx}`

    /**
     * const ${nodeName} = new DLight.IfNode();
     */
    statements.push(
      nodeGeneration(nodeName, t.identifier("IfNode"), [])
    )

    for (const condition of parserNode.attr.conditions) {
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
                  [], this.generate(condition.parserNodes)
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
                [], this.generate(condition.parserNodes)
              )
            ]
          )
        )
      )
    }

    return statements
  }

  resolveFor(parserNode: ParserNode, idx: number) {
    const statements: t.Statement[] = []
    const key = parserNode.attr.key
    const item = parserNode.attr.item
    const array = parserNode.attr.array

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
      const newGenerator = new Generator(this.path, this.depChain, this.subViews,
        [...this.idDepsArr, { ids: idArr, propNames: listenDeps }])
      const forBody = newGenerator.generate(parserNode.children)
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
                /**
                 * this._$deleteDeps(depsStr, ${key}UpdateFunc, Array.isArray(_$node0) ? _$node0[0] : _$node0);
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
                      this.generate(parserNode.children)
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

  resolveText(parserNode: ParserNode, idx: number) {
    const value = parserNode.attr._$content
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

  resolveHTML(parserNode: ParserNode, idx: number) {
    const statements: t.Statement[] = []
    const nodeName = `_$node${idx}`
    /**
     * const ${nodeName} = new DLight.HtmlNode(${parserNode.tag})
     */
    statements.push(
      nodeGeneration(nodeName, t.identifier("HtmlNode"), [parserNode.tag as any])
    )

    // ---- properties
    for (let { key, value, nodes } of parserNode.attr.props) {
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
      if (key.startsWith("on")) {
        // event
        const eventName = key.slice(2)
        /**
         * ${nodeName}._$addEvent(${eventName}, value);
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier("_$addEvent")
              ), [
                t.stringLiteral(eventName),
                value
              ]
            )
          )
        )
        continue
      }
      if (key === "addEvents") {
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier("_$addEvents")
              ), [
                value
              ]
            )
          )
        )
        continue
      }
      if (key === "_$content") {
        key = "innerText"
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
      if (key === "setAttributes") {
        if (listenDeps.length > 0) {
          /**
           * ${nodeName}._$addAttributes(() => (${value}), this, ${geneDepsStr(listenDeps)});
           */
          statements.push(
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.identifier(nodeName),
                  t.identifier("_$addAttributes")
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
         * ${nodeName}._$addAttributes(${value});
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier("_$addAttributes")
              ), [
                value
              ]
            )
          )
        )
        continue
      }
      if (key === "style") {
        if (listenDeps.length > 0) {
          /**
           * ${nodeName}._$addStyle(() => (${value}), this, ${geneDepsStr(listenDeps)});
           */
          statements.push(
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.identifier(nodeName),
                  t.identifier("_$addStyle")
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
         * ${nodeName}._$addStyle(${value});
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier("_$addStyle")
              ), [
                value
              ]
            )
          )
        )
        continue
      }
      if (key === "className") {
        if (listenDeps.length > 0) {
          /**
           * ${nodeName}._$addClassName(() => (${value}), this, ${geneDepsStr(listenDeps)});
           */
          statements.push(
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.identifier(nodeName),
                  t.identifier("_$addClassName")
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
         * ${nodeName}._$addClassName(${value});
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier("_$addClassName")
              ), [
                value
              ]
            )
          )
        )
        continue
      }
      if (listenDeps.length > 0) {
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

    // ---- children
    if (parserNode.children.length > 0) {
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
                  this.generate(parserNode.children)
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

  resolveCustom(parserNode: ParserNode, idx: number) {
    const statements: t.Statement[] = []
    const nodeName = `_$node${idx}`

    /**
     * const ${nodeName} = new (${parserNode.tag})();
     */
    statements.push(
      t.variableDeclaration(
        "const", [
          t.variableDeclarator(
            t.identifier(nodeName),
            t.newExpression(parserNode.tag as any, [])
          )
        ]
      )
    )

    // ---- props
    for (let { key, value, nodes } of parserNode.attr.props) {
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
    if (parserNode.children.length > 0) {
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
                this.generate(parserNode.children)
              )
            ]
          )
        )
      )
    }

    return statements
  }

  resolveSubView(parserNode: ParserNode, idx: number) {
    parserNode.attr.isSubView = true
    const nodeName = `_$node${idx}`
    const statements: t.Statement[] = []
    const props = parserNode.attr.props.map(({ key, value, nodes }: any) => {
      value = this.parsePropNodes(value, nodes)
      return { key, value }
    })

    const keyId = uid()
    const passProps: any[] = []
    for (const { key, value } of props) {
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
         * const ${key}UpdateFunc = () => ${keyWithId}.xx = xx
         **/
        statements.push(
          t.variableDeclaration(
            "const", [
              t.variableDeclarator(
                t.identifier(`${key}UpdateFunc`),
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
         * this._$addDeps(depsStr, ${key}UpdateFunc);
         **/
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.thisExpression(),
                t.identifier("_$addDeps")
              ), [
                t.arrayExpression(listenDeps),
                t.identifier(`${key}UpdateFunc`)
              ]
            )
          )
        )
      }
      passProps.push({ key, keyWithId, listenDeps })
    }
    /**
     * const nodeName = ${parserNode.tag}({${passProps.map(
     *  ({ key, keyWithId }) => `${key}: ${keyWithId}`
     * ).join(", ")}});
     */
    statements.push(
      t.variableDeclaration(
        "const", [
          t.variableDeclarator(
            t.identifier(nodeName),
            t.callExpression(
              parserNode.tag as t.MemberExpression, [
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
        /**
         * this._$deleteDeps(depsStr, ${key}UpdateFunc, ${nodeName}[0]);
         **/
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.thisExpression(),
                t.identifier("_$deleteDeps")
              ), [
                t.arrayExpression(listenDeps),
                t.identifier(`${key}UpdateFunc`),
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

  resolveEnv(parserNode: ParserNode, idx: number) {
    const nodeName = `_$node${idx}`
    const statements: t.Statement[] = []

    /**
     * const ${nodeName} = new DLight.TextNode()
     */
    statements.push(
      nodeGeneration(nodeName, t.identifier("EnvNode"), [])
    )
    // ---- child 要先加children
    if (parserNode.children.length > 0) {
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
                  this.generate(parserNode.children)
                ),
                []
              )
            ]
          )
        )
      )
    }

    // ---- props
    for (let { key, value, nodes } of parserNode.attr.props) {
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

  resolveExpression(parserNode: ParserNode, idx: number) {
    const statements: t.Statement[] = []
    const nodeName = `_$node${idx}`
    // ---- forward props
    for (let { key, value, nodes } of parserNode.attr.props) {
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

  parsePropNodes(value: t.Node, nodes: Record<string, ParserNode[]>) {
    let newValue = value
    const generate = this.generate.bind(this)

    this.path.scope.traverse(valueWrapper(value), {
      StringLiteral(innerPath: any) {
        const id = innerPath.node.value
        const parserNodes = nodes[id]
        if (!parserNodes) return
        const newNode = (
          t.callExpression(
            t.arrowFunctionExpression([], generate(parserNodes)),
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

export function resolveParserNode(path: any, parserNodes: ParserNode[], depChain: string[], subViews: string[], idDepsArr: IdDepsArr = []) {
  const generator = new Generator(path, depChain, subViews, idDepsArr)
  const code = generator.generate(parserNodes)
  return {
    code,
    useProperties: generator.usedProperties
  }
}
