import { bindParentNode, initNodes, toEls } from "../utils/nodes"
import { type AnyValue, type AnyDLNode, type ToBeSolvedAny } from "./type"

export enum DLNodeType {
  HTML, Text, Custom, For, If, Env, Expression
}

export class DLNode {
  /**
   * @brief Node type: HTML, Text, Custom, For, If, Env, Expression
   */
  _$nodeType: DLNodeType

  constructor(nodeType: DLNodeType) {
    this._$nodeType = nodeType
  }

  /**
   * @brief Node element
   *  Either one real element for HTMLNode and TextNode
   *  Or an array of DLNode for CustomNode, ForNode, IfNode, EnvNode, ExpressionNode
   */
  private __$el: Node | HTMLElement | ToBeSolvedAny
  get _$el(): Node | HTMLElement | ToBeSolvedAny {
    return this.__$el ?? toEls(this._$nodes)
  }

  set _$el(value: Node | HTMLElement | ToBeSolvedAny) {
    this.__$el = value
  }

  /**
   * @brief Parent DLNode
   *  Use this property to track the DLNode tree, and calculate the html element flow index
   */
  _$parentNode?: DLNode

  /**
   * @brief Child DLNodes
   */
  _$nodes: DLNode[] = []

  /**
   * @brief Called before init new nodes
   *  Used by env node to add envProps to sub nodes,
   *  we don't just put env update into _$init because when a new node is added,
   *  whether in ifNode or forNode or any expressionNode,
   *  we don't call _$init again, so instead we add this collectEnv function
   *  to make sure that every time a new node is added, we add envs to it
   */
  _$collectEnv(nodes: DLNode[]) {
    if (!(this as AnyDLNode)._$collectEnvFuncs) {
      (this as AnyDLNode)._$collectEnvFuncs = []
    }
    (this as AnyDLNode)._$collectEnvFuncs.forEach(([envNode, avoidKeys]: AnyValue) => (
      envNode.addEnvsToNodes(nodes, avoidKeys)
    ))
    if (
      this._$nodeType !== DLNodeType.If &&
      this._$nodeType !== DLNodeType.For &&
      this._$nodeType !== DLNodeType.Expression
    ) {
      // ---- No new nodes will be added for these nodes,
      //      so we can clear the collectEnvFuncs
      (this as AnyDLNode)._$collectEnvFuncs = []
    }
  }

  /**
   * @brief Bind nodes and recursively init nodes
   */
  _$bindNodes() {
    bindParentNode(this._$nodes, this)
    this._$collectEnv(this._$nodes)
    initNodes(this._$nodes)
  }

  /**
   * @brief Every node should have a init function
   *  Because when calling constructor, the order is inside our
   *  e.g. (not DLight syntax, just some nested functions to show the order)
   *    div(span(h1("hello")))
   *    constructor order: h1 -> span -> div
   *  What we want: div -> span -> h1
   *  So we add a init function to every node, and call it from the outmost node,
   *  then traverse all the this._$nodes and call their init functions
   *    div(span(h1("hello")))
   *    div.init() -> span.init() -> h1.init()
   */
  _$init() {}
}
