import { bindParentNode, initNodes, toEls } from "../utils/nodes"

export enum DLNodeType {
    HTML, Text, Custom, For, If, Env, Expression
}

export class DLNode {
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
     * 所有的nodes初始化必须在construct阶段，除了customNode，因为customNode一旦call了Body，就没法进行额外操作了
     * 所有的bindNodes都必须在init中进行，保证子的init都可以访问到父parentNode
     */
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
    _$depObjectIds: Object[] = []
    

    _$beforeInitSubNodes() {}
    _$bindNodes() {
        bindParentNode(this._$nodes, this)
        this._$beforeInitSubNodes()
        initNodes(this._$nodes)
    }

    constructor(nodeType: DLNodeType) {
        this._$nodeType = nodeType
    }

    _$init() {}

    // @ts-ignore
    render(parentEl: HTMLElement) {
        // ---- 同级别的append上去，不存在递归
    }

}

