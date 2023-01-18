import {DLightNode} from "./DLightNode";
import { DLNode, DLNodeType } from "./DLNode";
import { HtmlNode } from "./HtmlNode";
import { deleteDeps } from "../utils/dep";
import { loopNodes } from "../utils/nodes";


/**
 * 把nodes对应的elements从dom上移除
 * @param nodes 
 */
export function removeNodes(nodes: DLNode[]) {
    willDisappearDlightNodes(nodes)
    loopNodes(nodes, (node: DLNode) => {
        if ([DLNodeType.HTML, DLNodeType.Text].includes(node._$nodeType)) {
            node._$el.remove()
            return false
        }
        return true
    })
   didDisappearDlightNodes(nodes)
}


/**
 * 删掉所有有关node的deps
 * @param nodes 
 * @param dlScope 
 */
export function deleteNodesDeps(nodes: DLNode[], dlScope: DLightNode) {
    loopNodes(nodes, (node: DLNode) => {
        deleteDeps(dlScope, node._$id)
        for (let i of node._$depIds) {
            deleteDeps(dlScope, i)
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
    willAppearDlightNodes(nodes)
    loopNodes(nodes, (node: DLNode) => {
        if ([DLNodeType.Text, DLNodeType.HTML].includes(node._$nodeType)) {
            if (index === length) {
                parentEl!.appendChild(node._$el)
            } else {
                parentEl!.insertBefore(node._$el, parentEl.childNodes[index])
            }
            index ++
            length ++
            return false
        }
        return true
    })
    didAppearDlightNodes(nodes)
    return [index, length]
}

export function replaceNodesWithFirstElement(nodes: DLNode[], newNodes: DLNode[]) {
    const firstEl = nodesToFlatEls(nodes)[0]
    if (!firstEl) return false
    willAppearDlightNodes(newNodes)
    firstEl.replaceWith(...nodesToFlatEls(newNodes))
    didAppearDlightNodes(newNodes)
    return true
}

/**
 * flowCursor相关，index表明前面有n个普通HTMLElement
 * flowNodes是flow相关的节点，element个数不定，每次插入都要重新计算，但是这个节点的reference是固定的
 * @param flowNodes 
 * @returns 
 */
export function getFlowIndexFromParentNode(parentNode: HtmlNode, stopId: string) {
    const [index, _] = getFlowIndexFromNodesTillId(parentNode._$dlNodes, 0, stopId)
    return index
}
export function getFlowIndexFromNodes(nodes: DLNode[]) {
    const [index, _] = getFlowIndexFromNodesTillId(nodes, 0, "neverStop")
    return index
}
function getFlowIndexFromNodesTillId(nodes: DLNode[], index: number, stopId: string): [number, boolean] {
    let stop = false
    loopNodes(nodes, (node: DLNode) => {
        if (stop) return false
        if (node._$id === stopId) {
            stop = true
            return false
        }
        if ([DLNodeType.Text, DLNodeType.HTML].includes(node._$nodeType)) {
            index ++
        }
        return true
    })
    return [index, stop]
}

/**
 * 把DLNodes全部转化成HTMLElements来返回，在执行这个之前需要init
 * @param nodes 
 * @returns 
 */
export function nodesToFlatEls(nodes: DLNode[]) {
    const els: any[] = []
    loopNodes(nodes, (node: DLNode) => {
        if ([DLNodeType.Text, DLNodeType.HTML].includes(node._$nodeType)) {
            els.push(node._$el)
            return false
        }
        return true
    })
    return els
}


/**
 * 四个生命周期
 * @param nodes 
 */
function runDlightNodesLifecycle(nodes: DLNode[], lifecysle: "willAppear"|"didAppear"|"willDisappear"|"didDisappear") {
    loopNodes(nodes, (node: DLNode) => {
        if ([DLNodeType.Dlight, DLNodeType.HTML].includes(node._$nodeType)) {
            node[lifecysle]()
            return false
        }
        return true
    })
}

function willAppearDlightNodes(nodes: DLNode[]) {
    runDlightNodesLifecycle(nodes, "willAppear")
}

function didAppearDlightNodes(nodes: DLNode[]) {
    runDlightNodesLifecycle(nodes, "didAppear")
}

function willDisappearDlightNodes(nodes: DLNode[]) {
    runDlightNodesLifecycle(nodes, "willDisappear")
}

function didDisappearDlightNodes(nodes: DLNode[]) {
    runDlightNodesLifecycle(nodes, "didDisappear")
}
