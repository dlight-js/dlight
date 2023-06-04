import { type ParserNode } from "./parser"
import { geneDeps, geneIdDeps, uid, getIdentifiers, resolveForBody, isElementFunction, isHTMLTag, parseCustomTag, isTwoWayConnected, isSubViewTag } from "./generatorHelper"
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
    if (t.isIdentifier(parserNode.tag as any) && (parserNode.tag as any).name === "_") return this.resolveExpression(parserNode, idx)
    if (parserNode.tag === "env") return this.resolveEnv(parserNode, idx)
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
      const idArr = getIdentifiers(item, this.path)
      const valueId = uid()
      const valueItemStr = `_$valuedItem${valueId}`
      // ---- 子body
      const newGenerator = new Generator(this.path, this.depChain, this.subViews,
        [...this.idDepsArr, { ids: idArr, propNames: listenDeps }])
      const forBody = newGenerator.generate(parserNode.children)
      this.usedProperties.push(...newGenerator.usedProperties)
      resolveForBody(this.path, forBody, item, valueItemStr)
      // ---- 前面的listen函数很复杂，主旨就是把 let {idx, item} of array
      //      变成 let {idx.value, item.value} of array
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
                 * const ${valueItemStr} = {};
                 */
                t.variableDeclaration(
                  "const", [
                    t.variableDeclarator(
                      t.identifier(valueItemStr),
                      t.objectExpression([])
                    )
                  ]
                ),
                /**
                 * for (const i of idArr) {
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
                )),
                /**
                 * node_for._$listen(this, ()=>node_for._$getItem(_$key, _$idx), ${geneDepsStr(listenDeps)}, (_$item) => {`
                 *  });
                 */
                t.expressionStatement(
                  t.callExpression(
                    t.memberExpression(
                      t.identifier("node_for"),
                      t.identifier("_$listen")
                    ), [
                      t.thisExpression(),
                      t.arrowFunctionExpression(
                        [],
                        t.callExpression(
                          t.memberExpression(
                            t.identifier("node_for"),
                            t.identifier("_$getItem")
                          ), [
                            t.identifier("_$key"),
                            t.identifier("_$idx")
                          ]
                        )
                      ),
                      t.arrayExpression(listenDeps),
                      t.arrowFunctionExpression([
                        t.identifier("_$item")
                      ],
                      t.blockStatement([
                        /**
                         * const ${item} = _$item;
                         */
                        t.variableDeclaration(
                          "const", [
                            t.variableDeclarator(
                              item,
                              t.identifier("_$item")
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
                    ]
                  )
                ),
                forBody
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
      if (key === "_$content") {
        key = "innerText"
      }
      const listenDeps = this.geneDeps(value)
      if (key === "element") {
        /**
         * const ${nodeName}Element = () => ${value} = ${nodeName}._$el;
         */
        statements.push(
          t.variableDeclaration(
            "const", [
              t.variableDeclarator(
                t.identifier(`${nodeName}Element`),
                t.arrowFunctionExpression(
                  [],
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
            ]
          )
        )
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
        /**
         * this._$addDeps(${geneDepsStr(listenDeps)}, {}, ${nodeName}Element)
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.thisExpression(),
                t.identifier("_$addDeps")
              ), [
                t.arrayExpression(listenDeps),
                t.objectExpression([]),
                t.identifier(`${nodeName}Element`)
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
    for (const { key, value, nodes } of parserNode.attr.props) {
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
      const listenDeps = this.geneDeps(value)
      if (key === "element") {
        const isFunction = isElementFunction(value)
        if (isFunction) {
          /**
           * const ${nodeName}Element = () => (${value})(${nodeName}._$el);
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
        } else {
          /**
           * const ${nodeName}Element = () => ${value} = ${nodeName}._$el;
           */
          statements.push(
            t.variableDeclaration(
              "const", [
                t.variableDeclarator(
                  t.identifier(`${nodeName}Element`),
                  t.arrowFunctionExpression(
                    [],
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
              ]
            )
          )
        }
        /**
         * ${nodeName}._$addAfterset(${nodeName}Element);
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier("_$addAfterset")
              ), [
                t.identifier(`${nodeName}Element`)
              ]
            )
          )
        )
        /**
         * this._$addDeps(${geneDepsStr(listenDeps)}, {}, ${nodeName}Element);
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.thisExpression(),
                t.identifier("_$addDeps")
              ), [
                t.arrayExpression(listenDeps),
                t.objectExpression([]),
                t.identifier(`${nodeName}Element`)
              ]
            )
          )
        )
        continue
      }
      if (listenDeps.length > 0) {
        /**
         * ${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)}, ${geneIsTwoWayConnected(value)})
         */
        statements.push(
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.identifier("_$addDeps")
              ), [
                t.stringLiteral(key),
                t.arrowFunctionExpression([], value),
                t.thisExpression(),
                t.arrayExpression(listenDeps),
                t.booleanLiteral(isTwoWayConnected(value))
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

    // ---- child
    if (parserNode.children.length > 0) {
      /**
       * ${nodeName}._$addchildren([() => {
       *  this.resolveParserNode(child, 0)
       *  return _$node0
       * }])
       */
      statements.push(
        t.expressionStatement(
          t.callExpression(
            t.memberExpression(
              t.identifier(nodeName),
              t.identifier("_$addChildren")
            ), [t.arrayExpression(parserNode.children.map(child => (
              t.arrowFunctionExpression(
                [],
                t.blockStatement([
                  ...this.resolveParserNode(child, 0),
                  t.returnStatement(t.identifier("_$node0"))
                ])
              )
            )))]
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
      this.parsePropNodes(value, nodes)
      return { key, value }
    })

    const keyId = uid()
    const passProps: Array<{ key: string, keyWithId: string }> = []
    for (const [i, { key, value }] of props.entries()) {
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
      passProps.push({ key, keyWithId })
      /**
       * const depId${idx}_${i} = {};
       */
      statements.push(
        t.variableDeclaration(
          "const", [
            t.variableDeclarator(
              t.identifier(`depId${idx}_${i}`),
              t.objectExpression([])
            )
          ]
        )
      )
      /**
       * this._$addDeps(${depsStr}, depId${idx}_${i}, () => {${keyWithId}.value = ${value}});
       */
      statements.push(
        t.expressionStatement(
          t.callExpression(
            t.memberExpression(
              t.thisExpression(),
              t.identifier("_$addDeps")
            ), [
              t.arrayExpression(listenDeps),
              t.identifier(`depId${idx}_${i}`),
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
            ]
          )
        )
      )
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
    // ---- subView一定要有返回值！dep放到返回的第一个里面，这样子删除的时候就可以一起删了，不会内存泄漏
    /**
     * _$node${idx}[0]._$depObjectIds.push(...[${Object.keys(props).map(i => `depId${idx}_${i}`).join(",")}]);
     */
    statements.push(
      t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.memberExpression(
              t.memberExpression(
                t.identifier(nodeName),
                t.numericLiteral(0),
                true
              ),
              t.identifier("_$depObjectIds")
            ),
            t.identifier("push")
          ), [
            t.spreadElement(
              t.arrayExpression(
                Object.keys(props).map(i => (
                  t.identifier(`depId${idx}_${i}`)
                ))
              )
            )
          ]
        )
      )
    )

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
    for (const { key, value, nodes } of parserNode.attr.props) {
      this.parsePropNodes(value, nodes)
      const listenDeps = this.geneDeps(value)
      if (listenDeps.length > 0) {
        /**
         * ${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)}, ${geneIsTwoWayConnected(value)});
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
                t.arrayExpression(listenDeps),
                t.booleanLiteral(isTwoWayConnected(value))
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
    for (const { key, value, nodes } of parserNode.attr.props) {
      this.parsePropNodes(value, nodes)
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
      if (listenDeps.length > 0) {
        /**
         * ${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)}, ${geneIsTwoWayConnected(value)});
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
                t.arrayExpression(listenDeps),
                t.booleanLiteral(isTwoWayConnected(value))
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
    this.path.scope.traverse(value, {
      StringLiteral(innerPath: any) {
        const id = innerPath.node.value
        const parserNodes = nodes[id]
        if (!parserNodes) return
        innerPath.replaceWith(
          t.callExpression(
            t.arrowFunctionExpression([], this.generate(parserNodes)),
            []
          )
        )
        innerPath.skip()
      }
    })
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
