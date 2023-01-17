import { uid } from "../utils/util"


type NodeType = "html" | "dlight" | "text" | "for" | "if" | "env"

export class DLNode {
    /**
     * @param _$id - 每一个Node都有id
     * @param _$el - 代表DOM上面的node，只有TextNode和HtmlNode有实体node
     * @param _$nodes - 所有嵌套Node的抽象表示
     * 
     * @param _$init - 这之前nodes和el都必须生成，flow需要更新整体结构
     * @param _$render - 传入parentEl，将_$nodes append上去
     * 
     * 
     * @pipeline
     * html: A; dlight: B; flow: C
     * 
     * A1.construct <- A2.construct <- B1.construct <- B2.construct <- C1.construct <- C2.construct 
     * A1._$init -> A2._$init -> B1._$init -> B2._$init -> C1._$init -> C2._$init 
     *           ↳ A2.render  ↳ B1.render 
     * A1.render -> A => Stop / B/C => B/C.render
     *
     * 在BC下面，每一次产生新nodes时，都会调用afterNodesCreated
     */
    _$id: string = ""
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

    // @ts-ignore
    _$afterElsCreated(nodes: DLNode[]) {}
    
    get _$dlNodes() {
        return this._$nodes as DLNode[]
    }
    get _$dlNodess() {
        return this._$nodes as DLNode[][]
    }
    _$nodeType: NodeType

    constructor(nodeType: NodeType, id?: string) {
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

