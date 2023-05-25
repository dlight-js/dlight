import { bindParentNode, initNodes, toEls } from "../utils/nodes"
import { type ObjectId } from "./types"

export enum DLNodeType {
  HTML, Text, Custom, For, If, Env, Expression
}
/**
     * @member _$id
     *      - 每一个Node都有id
     * @member _$nodeType
     *      - 每一个Node都有具体的type，是一个枚举
     *      - enum DLNodeType {
     *          HTML, Text, Custom, For, If, Env
     *        }
     *      - 只提供基础类如HTML/Text，自定义类Dlight/Env，控制流类For/If
     *
     * @member _$nodes
     *      - 所有嵌套Node的抽象表示，就是个ast
     * @member _$el
     *      - 代表真实DOM上面的node，只有TextNode和HtmlNode有实体node
     * @method _$init
     *      - 这之前nodes和el都必须生成，flow需要更新整体结构
     * @method _$render
     *      - 传入parentEl，将_$nodes append上去
     *
     *
     * @pipeline
     * html: A; dlight: B; flow: C
     * 嵌套调用：A1 { A2 { B1 { B2 { C1 { C2 } } } } }
     * A1.construct <- A2.construct <- B1.construct <- B2.construct <- C1.construct <- C2.construct
     * A1._$init -> A2._$init -> B1._$init -> B2._$init -> C1._$init -> C2._$init
     *           ↳ A2.render  ↳ B1.render
     * A1.render (A => Stop  B/C => B/C.render)
     *
     * @hint
     * 所有的nodes初始化必须在init阶段，除了customNode，因为customNode一旦call了Body，就没法进行额外操作了
     * 所有的bindNodes都必须在init中进行，保证子的init都可以访问到父parentNode
     */
export class DLNode {
  _$nodeType: DLNodeType
  private __$el: Node | HTMLElement | any
  get _$el(): Node | HTMLElement | any {
    return this.__$el ?? toEls(this._$nodes)
  }

  set _$el(value: Node | HTMLElement | any) {
    this.__$el = value
  }

  _$parentNode?: DLNode
  _$nodes: DLNode[] = []
  _$depObjectIds: ObjectId[] = []

  _$detach() {
    this._$parentNode = undefined
    this._$nodes = []
    this._$depObjectIds = []
    if (![DLNodeType.Text, DLNodeType.HTML].includes(this._$nodeType)) {
      this.__$el = undefined
    }
    // ---- 在env内会嵌套调用，所以detach后要置空
    this._$beforeInitSubNodes = function() {}
  }

  _$beforeInitSubNodes(_nodes: DLNode[]) {}
  _$addBeforeInitSubNodes(func: (_nodes: DLNode[]) => any) {
    const prevBeforeInitSubNodes = this._$beforeInitSubNodes
    this._$beforeInitSubNodes = function(nodes: DLNode[]) {
      prevBeforeInitSubNodes.call(this, nodes)
      func.call(this, nodes)
    }
  }

  // 将子组件挂在该组件上，将子组件init
  _$bindNodes() {
    bindParentNode(this._$nodes, this)
    this._$beforeInitSubNodes(this._$nodes)
    initNodes(this._$nodes)
  }

  constructor(nodeType: DLNodeType) {
    this._$nodeType = nodeType
  }

  _$init() {}
}
