export function uid() {
    return Math.random().toString(20).slice(2)
}

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
     */
    _$id: string = ""
    _$el: Node | HTMLElement | any
    _$parentNode?: DLNode
    _$nodes: DLNode[] | DLNode[][] = []
    
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


    _$init() { }

    // @ts-ignore
    render(parentEl: HTMLElement) {
        // ---- 同级别的append上去，不存在递归
    }

}

