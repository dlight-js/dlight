import {CustomNode} from "./CustomNode";
import { DLNode, DLNodeType } from "./DLNode";
import { HtmlNode } from "./HtmlNode";
import { loopNodes, loopEls } from "../utils/nodes";




/**
 * 把nodes对应的elements从dom上移除
 * @param nodes 
 */
export function removeNodes(nodes: DLNode[]) {
    willUnmountDlightNodes(nodes)
    loopEls(nodes, (el: HTMLElement, node: HtmlNode) => {
        if (node._$nodeType === DLNodeType.HTML) {
            // node.willDisappear(el)
        }
        el.remove()
        if (node._$nodeType === DLNodeType.HTML) {
            // node.didDisappear(el)
        }
    })
   didUnmountDlightNodes(nodes)
}


/**
 * 删掉所有有关node的deps
 * @param nodes 
 * @param dlScope 
 */
export function deleteNodesDeps(nodes: DLNode[], dlScope: CustomNode) {
    loopNodes(nodes, (node: DLNode) => {
        for (let i of node._$depObjectIds) {
            dlScope._$deleteDeps(i)
        }
        return true
    })
}

/**
 * 把DLNode插到指定index的parentEl上
 * 如果index===length说明是最后一个append
 * 不然就insertBefore
 * @param nodes 
 * @param index 
 * @param parentEl 
 * @param lengthIn - 调用parentEl.childNodes.length会浪费时间，从外面传入会省很多时间
 * @returns 
 */
export function appendNodesWithIndex(nodes: DLNode[], index: number, parentEl: HTMLElement, lengthIn?: number): [number, number] {
    let length = lengthIn ?? parentEl.childNodes.length
    willMountDlightNodes(nodes)

    loopEls(nodes, (el: HTMLElement, node: HtmlNode) => {
        const sibling = parentEl.childNodes[index] as any
        if ([DLNodeType.HTML].includes(node._$nodeType)) {
            node.willAppear(el)
        }
        if (index === length) {
            parentEl!.appendChild(el)
        } else {
            parentEl!.insertBefore(el, sibling)
        }
        if ([DLNodeType.HTML].includes(node._$nodeType)) {
            node.didAppear(el)
        }
        index ++
        length ++
    }, false)
    didMountDlightNodes(nodes)
    return [index, length]
}


/**
 * flowCursor相关，index表明前面有n个普通HTMLElement
 * flowNodes是flow相关的节点，element个数不定，每次插入都要重新计算，但是这个节点的reference是固定的
 * @param flowNodes 
 * @returns 
 */
export function getFlowIndexFromParentNode(parentNode: HtmlNode, stopNode: DLNode) {
    return getFlowIndexFromNodesTillId(parentNode._$nodes, stopNode)
}

export function getFlowIndexFromNodes(nodes: DLNode[]) {
    return getFlowIndexFromNodesTillId(nodes, undefined as any)
}

function getFlowIndexFromNodesTillId(nodes: DLNode[], stopNode: DLNode) {
    let index = 0
    let stop = false
    loopNodes(nodes, (node: DLNode) => {
        if (stop) return false
        if (node === stopNode) {
            stop = true
            return false
        }
        if ([DLNodeType.Text, DLNodeType.HTML].includes(node._$nodeType)) {
            index ++
        }
        return true
    })
    return index
}


/**
 * 四个生命周期
 * @param nodes 
 */
function runDlightNodesLifecycle(nodes: DLNode[], lifecysle: "willMount"|"didMount"|"willUnmount"|"didUnmount") {
    loopNodes(nodes, (node: DLNode) => {
        if (node._$nodeType === DLNodeType.Custom) {
            (node as CustomNode)[lifecysle]()
        }
        return true
    })
}

function willMountDlightNodes(nodes: DLNode[]) {
    runDlightNodesLifecycle(nodes, "willMount")
}

function didMountDlightNodes(nodes: DLNode[]) {
    runDlightNodesLifecycle(nodes, "didMount")
}

function willUnmountDlightNodes(nodes: DLNode[]) {
    runDlightNodesLifecycle(nodes, "willUnmount")
}

function didUnmountDlightNodes(nodes: DLNode[]) {
    runDlightNodesLifecycle(nodes, "didUnmount")
}
