import { loopEls, loopNodes } from '../../utils/nodes';
import { CustomNode } from '../CustomNode';
import { DLNode, DLNodeType } from '../DLNode';
import { HtmlNode } from '../HtmlNode';
import { TextNode } from '../TextNode';
import { appendNodesWithIndex, deleteNodesDeps, getFlowIndexFromParentNode, removeNodes } from '../utils';
import { MutableNode } from './MutableNode';


type ExpressionNodeType = DLNode | DLNode[]

export class ExpressionNode extends MutableNode {
    nodeOrFunc?: () => ExpressionNodeType
    listenDeps?: string[]
    dlScope?: CustomNode

    propFuncs: (() => any)[] = []

    propScope: ((el: HTMLElement, node: DLNode) => boolean) = () => true
    deepLoopEl = false

    constructor(nodeOrFunc: ExpressionNodeType | (() => ExpressionNodeType), dlScope?: CustomNode, listenDeps?: string[]) {
        super(DLNodeType.Expression)
        if (!listenDeps) {
            this._$nodes = this.formatNodes(nodeOrFunc)
            return
        }
        this.nodeOrFunc = nodeOrFunc as () => ExpressionNodeType
        this.listenDeps = listenDeps   
        this.dlScope = dlScope   
        this._$nodes = this.formatNodes(this.nodeOrFunc!())
    }

    _$addProp(key: string, valueOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
        if (key === "_$propScope") {
            this.propScope = valueOrFunc
            return
        }
        if (key === "_$deepLoopEl") {
            this.deepLoopEl = valueOrFunc
            return
        }
        if (key === "onUpdateNodes") {
            loopNodes(this._$nodes, node => {
                if (![DLNodeType.If, DLNodeType.For, DLNodeType.Expression].includes(node._$nodeType)) return true;
                (node as MutableNode).addOnUpdateNodesFunc(valueOrFunc)
                return true
            })
        }
        const propScope = this.propScope
        const deepLoopEl = this.deepLoopEl
        // TODO 太复杂，要简化
        const addHtmlNodeProp = (node: HtmlNode) => {
            const el = node._$el
            if (!propScope(el, node)) return
            // ---- 不覆盖
            if (key[0] === "_" && (node._$el.style[key.slice(1)]??"").trim() !== "") return
            if (key[0] !== "_" && node._$el[key] !== undefined) return
            if (["willAppear", "didAppear", "willDisappear", "didDisappear"].includes(key)) {
                (node as HtmlNode)._$addLifeCycle(valueOrFunc, key as any)
                return
            }
            (node as HtmlNode)._$addProp(key, valueOrFunc, dlScope, listenDeps)
        }
        this.propFuncs.push(() => {
            loopNodes(this._$nodes, node =>{
                switch (node._$nodeType) {
                    // ---- 这一些都是要bindNodes的，在bindNodes时候给里面的_$nodes进行遍历加prop
                    //      典型的如for循环，newNodes的时候也会bindNodes，也要加这些prop
                    case DLNodeType.For:
                    case DLNodeType.If:
                    case DLNodeType.Expression:
                        (node as any).addAfterUpdateNewNodesFunc((nodes: DLNode[]) => {
                            loopEls(nodes, (_: HTMLElement, node: HtmlNode) => {
                                if (node._$nodeType !== DLNodeType.HTML) return
                                addHtmlNodeProp(node)
                            }, deepLoopEl)
                        })
                        return false
                    case DLNodeType.HTML:
                        addHtmlNodeProp(node as HtmlNode)
                        return deepLoopEl
                }
                return false
            })
        })
    }

    formatNodes(nodes: any) {
        if (!Array.isArray(nodes)) {
            nodes = [nodes]
        } 
        nodes = nodes.flat(1)
        nodes = nodes.filter((node: any)=>node).map((node: any) => {
            if (node._$nodeType !== undefined) return node
            return new TextNode(node, this.dlScope, this.listenDeps)
        })
        return nodes
    }

    _$init() {
        if (this.listenDeps === undefined) {
            for (let func of this.propFuncs) {
                func()
            }
            this._$bindNodes()
            return
        }
         // ---- 找到HTMLNode作为parentNode，因为它是有真实el的
         let parentNode: DLNode | undefined = this._$parentNode
         while (parentNode && parentNode._$nodeType !== DLNodeType.HTML) {
             parentNode = parentNode._$parentNode
         }
         
         if (!parentNode) return

        // ---- 加deps
        const objectId = {}
        this._$depObjectIds.push(objectId)
        this.dlScope!._$addDeps(this.listenDeps!, objectId, () => this.update)

        for (let func of this.propFuncs) {
            func()
            const objectId = {}
            this._$depObjectIds.push(objectId)
            this.dlScope!._$addDeps(this.listenDeps!, objectId, func)
        }

        this._$bindNodes()
    }
    render(parentEl: HTMLElement) {
        for (let node of this._$nodes) {
            node.render(parentEl)
        }
    }
    update(parentNode: HtmlNode) {
        const prevNodes = this._$nodes
        // ---- 把以前的删除了
        deleteNodesDeps(this._$nodes, this.dlScope!)
        removeNodes(this._$nodes)

        // ---- 创建新的
        this._$nodes = this.formatNodes(this.nodeOrFunc!())
        this._$bindNewNodes(this._$nodes)

        // ---- 添加新的
        const parentEl = parentNode._$el
        const flowIndex = getFlowIndexFromParentNode(parentNode, this)
        appendNodesWithIndex(this._$nodes, flowIndex, parentEl, parentEl.childNodes.length)

        this.onUpdateNodes(prevNodes, this._$nodes)
    }

}


