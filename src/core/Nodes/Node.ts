import {uid, addDeps, addDep, runDeps} from '../utils';
import {DecoratorMaker, DecoratorResolver} from '../decorator';


type NodeType = "html" | "dlight" | "text" | "for" | "if"

export class DLNode {
    /**
     * @param _$id - 每一个Node都有id
     * @param _$el - 代表DOM上面的node，只有TextNode和HtmlNode有实体node
     * @param _$nodes - 所有嵌套Node的抽象表示
     * 
     * @param _$init - 这之前nodes和el都必须生成，flow需要更新整体结构
     * @param _$render - 传入parentEl，将_$nodes append上去
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

    _$initNodes() {
        for (let nodeOrNodes of this._$nodes) {
            const nodes = Array.isArray(nodeOrNodes) ? nodeOrNodes : [nodeOrNodes]
            for (let node of nodes) {
                node._$init()
            }
        }
    }

    _$init(..._: any[]) {
        this._$initNodes()
    }

    render(parentEl?: HTMLElement) {
        switch (this._$nodeType) {
            case "text":
                parentEl!.appendChild(this._$el)
                break
            case "html":
                if (!parentEl) {
                    parentEl = this._$el
                } else {
                    parentEl!.appendChild(this._$el)
                }
                for (let node of this._$dlNodes) {
                    node.render(parentEl)
                }
                break
            case "for":
                for (let nodes of this._$dlNodess) {
                    for (let node of nodes) {
                        node.render(parentEl)
                    }
                }
                break
            case "if":
            case "dlight":
                for (let node of this._$dlNodes) {
                    node.render(parentEl)
                }
                break
        }
    }

}

