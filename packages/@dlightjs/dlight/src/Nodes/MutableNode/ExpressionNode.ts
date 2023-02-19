import { loopEls, loopNodes } from '../../utils/nodes';
import { CustomNode } from '../CustomNode';
import { DLNode, DLNodeType } from '../DLNode';
import { HtmlNode } from '../HtmlNode';
import { TextNode } from '../TextNode';
import {appendNodesWithIndex, deleteNodesDeps, detachNodes, getFlowIndexFromParentNode, removeNodes} from '../utils';
import { MutableNode } from './MutableNode';


type ExpressionNodeType = DLNode | DLNode[]

export class ExpressionNode extends MutableNode {
    nodeOrFunc?: () => ExpressionNodeType
    listenDeps?: string[]
    dlScope?: CustomNode

    propFuncs: (() => any)[] = []

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
        // TODO 太复杂，要简化
        const addHtmlNodeProp = (node: HtmlNode) => {
            if (["willAppear", "didAppear", "willDisappear", "didDisappear"].includes(key)) {
                (node as HtmlNode)._$addLifeCycle(valueOrFunc, key as any)
                return
            }
            // ---- 不覆盖style
            if (key[0] === "_" && (node._$el.style[key.slice(1)]??"").trim() !== "") return
            // ---- 不覆盖其他，排除className
            if (!["className"].includes(key) && key[0] !== "_" && node._$el[key] !== undefined) return
            (node as HtmlNode)._$addProp(key, valueOrFunc, dlScope, listenDeps)
        }
        this.propFuncs.push(() => {
            for (let node of this._$nodes) {
                switch (node._$nodeType) {
                    case DLNodeType.HTML:
                        addHtmlNodeProp(node as HtmlNode)
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
                            }, false)
                        })
                    default:
                        loopEls(node._$nodes, (_: HTMLElement, node: HtmlNode) => {
                            if (node._$nodeType !== DLNodeType.HTML) return
                            addHtmlNodeProp(node)
                        }, false)
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
                node !== undefined && node !== null && typeof node !== "boolean"
            )).map((node: any) => {
            if (node._$nodeType !== undefined) return node
            // TODO 其他 Array 什么的不处理？默认传成text？
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

        // ---- 以前的detach掉
        detachNodes(prevNodes)
        this.onUpdateNodes(prevNodes, this._$nodes)
    }
}


