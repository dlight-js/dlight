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

    // ---- onUpdate
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

    _$onUpdateNodes(func: () => any) {
        loopNodes(this._$nodes, node => {
            if (![DLNodeType.If, DLNodeType.For, DLNodeType.Expression].includes(node._$nodeType)) return true;
            (node as MutableNode).addOnUpdateNodesFunc(func)
            return true
        })
    }

    _$addProp(key: string, valueOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
        const propScope = this.propScope
        const deepLoopEl = this.deepLoopEl
        // TODO 太复杂，要简化
        const addHtmlNodeProp = (node: HtmlNode) => {
            const el = node._$el
            if (!propScope(el, node)) return
            // ---- 不覆盖
            if (key[0] === "_" && (node._$el.style[key.slice(1)]??"").trim() !== "") return
            if (key[0] !== "_" && node._$el[key] !== undefined) return
            (node as HtmlNode)._$addProp(key, valueOrFunc, dlScope, listenDeps)
        }
        this.propFuncs.push(() => {
            for (let node of this._$nodes) {
                switch (node._$nodeType) {
                    case DLNodeType.HTML:
                        addHtmlNodeProp(node as HtmlNode)
                        if (deepLoopEl) {
                            // ---- 如果不是deepLoopEl，只要add自己就行了
                            loopEls(node._$nodes, (_: HTMLElement, node: HtmlNode) => {
                                if (node._$nodeType !== DLNodeType.HTML) return
                                addHtmlNodeProp(node)
                            }, true)
                        }
                        break
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
                    default:
                        loopEls(node._$nodes, (_: HTMLElement, node: HtmlNode) => {
                            if (node._$nodeType !== DLNodeType.HTML) return
                            addHtmlNodeProp(node)
                        }, deepLoopEl)
                }
            }
        })
    }

    formatNodes(nodes: any) {
        if (!Array.isArray(nodes)) {
            nodes = [nodes]
        } 
        nodes = nodes.flat(1)
        nodes = nodes.filter((node: any)=>(
                node !== undefined && node !== null
            )).map((node: any) => {
            if (node._$nodeType !== undefined) return node
            return new TextNode(node)
        })
        return nodes
    }

    _$init() {
        if (this.listenDeps === undefined) {
            this._$bindNodes()
            for (let func of this.propFuncs) {
                func()
            }
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
        this.dlScope!._$addDeps(this.listenDeps!, objectId, () => this.update(parentNode! as HtmlNode))

        this._$bindNodes()
        for (let func of this.propFuncs) {
            func()
            const objectId = {}
            this._$depObjectIds.push(objectId)
            this.dlScope!._$addDeps(this.listenDeps!, objectId, func)
        }

    }

    render(parentEl: HTMLElement) {
        this.willMount(this)
        for (let node of this._$nodes) {
            node.render(parentEl)
        }
        this.didMount(this)
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

        this.onUpdate(prevNodes, this._$nodes)
    }

    // ---- lifecycles
    willMount(_node?: ExpressionNode) {}
    didMount(_node?: ExpressionNode) {}
    willUnmount(_node?: ExpressionNode) {}
    didUnmount(_node?: ExpressionNode) {}

    _$addLifeCycle(func: (_node: ExpressionNode) => any, lifeCycleName: "willMount" | "didMount" | "willUnmount" | "didUnmount") {
        const preLifeCycle = this[lifeCycleName]
        this[lifeCycleName] = function(_node: ExpressionNode) {
            func.call(this, this)
            preLifeCycle.call(this, this)
        }
    }
}


