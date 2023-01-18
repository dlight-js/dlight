import { bindParentNode, initNodes } from "../utils/nodes"
import { uid } from "../utils/util"


export enum DLNodeType {
    HTML, Text, Dlight, For, If, Env
}

export class DLNode {
    /**
     * @member _$id
     *      - 每一个Node都有id
     * @member _$nodeType
     *      - 每一个Node都有具体的type，是一个枚举
     *      - enum DLNodeType {
     *          HTML, Text, Dlight, For, If, Env
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
     */
    _$id: string = ""
    _$nodeType: DLNodeType
    private __$el: Node | HTMLElement | any
    public get _$el(): Node | HTMLElement | any {
        return this.__$el
    }
    public set _$el(value: Node | HTMLElement | any) {
        this.__$el = value
    }
    _$parentNode?: DLNode
    _$nodes: DLNode[] | DLNode[][] = []
    _$depIds: string[] = []
    
    get _$dlNodes() {
        return this._$nodes as DLNode[]
    }
    get _$dlNodess() {
        return this._$nodes as DLNode[][]
    }

    _$bindNodes(nodes: DLNode[] | DLNode[][], bindToThis=true) {
        if (bindToThis) this._$nodes = nodes
        bindParentNode(nodes, this)
        initNodes(nodes)
    }

    constructor(nodeType: DLNodeType, id?: string) {
        this._$id = id ?? uid()
        this._$nodeType = nodeType
    }


    _$init() {}

    // @ts-ignore
    render(parentEl: HTMLElement) {
        // ---- 同级别的append上去，不存在递归
    }

    // ---- lifecycles
    willAppear() {}
    didAppear() {}
    willDisappear() {}
    didDisappear() {}

}

