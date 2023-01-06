import {DLightNode} from "./DLightNode";
import {deleteDeps} from "../utils";
import { DLNode } from "./Node";
import { HtmlNode } from "./HtmlNode";


/**
 * 把nodes对应的elements从dom上移除
 * @param nodes 
 */
export function removeNodes(nodes: DLNode[]) {
    willUnmountDlightNodes(nodes)
    for (let node of nodes) {
        removeNode(node)
    }
    didUnmountDlightNodes(nodes)
}
function removeNode(node: DLNode) {
    switch (node._$nodeType) {
        case "html":
        case "text":
            node._$el.remove()
            break
        case "for":
            for (let nodes of node._$dlNodess) {
                removeNodes(nodes)
            }
            break
        case "dlight":
        case "if":
            removeNodes(node._$dlNodes)
            break
    }
}

/**
 * 删掉所有有关node的deps
 * @param nodes 
 * @param dlScope 
 */
export function deleteNodesDeps(nodes: DLNode[], dlScope: DLightNode) {
    for (let node of nodes) {
        deleteNodeDeps(node, dlScope)
    }
}
function deleteNodeDeps(node: DLNode, dlScope: DLightNode) {
    deleteDeps(dlScope, node._$id)
    switch (node._$nodeType) {
        case "dlight":
            for (let i of (node as DLightNode)._$depIds) {
                deleteDeps(dlScope, i)
            }
        case "html":
        case "if":
            deleteNodesDeps(node._$dlNodes, dlScope)
            break            
        case "for":
            for (let nodes of node._$dlNodess) {
                deleteNodesDeps(nodes, dlScope)
            }
            break
    }
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
    for (let node of nodes) {
        [index, length] = appendNodeWithIndex(node, index, parentEl, length)
    }
    didMountDlightNodes(nodes)
    return [index, length]
}
function appendNodeWithIndex(node: DLNode, index: number, parentEl: HTMLElement, length: number): [number, number] {
    switch (node._$nodeType) {
        case "text":
        case "html":
            if (index === length) {
                parentEl!.appendChild(node._$el)
            } else {
                parentEl!.insertBefore(node._$el, parentEl.childNodes[index])
            }
            index ++
            length ++
            break
        case "for":
            for (let nodes of node._$dlNodess) {
                [index, length] = appendNodesWithIndex(nodes, index, parentEl, length)
            }
            break
        case "dlight":
        case "if":
            [index, length] = appendNodesWithIndex(node._$dlNodes, index, parentEl, length)
            break
    }

    return [index, length]
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
    for (let node of nodes) {
        [index, stop] = getFlowIndexFromNodeTillId(node, index, stopId)
        if (stop) break
    }
    return [index, stop]
}
function getFlowIndexFromNodeTillId(node: DLNode, index: number, stopId: string): [number, boolean] {
    let stop = false
    switch (node._$nodeType) {
        case "html":
        case "text":
            index ++
            break
        case "for":
            if (node._$id === stopId) {
                stop = true
                break
            }
            for (let nodes of node._$dlNodess) {
                [index, stop] = getFlowIndexFromNodesTillId(nodes, index, stopId)
                if (stop) break
            }
            break
        case "dlight":
        case "if":
            [index, stop] = getFlowIndexFromNodesTillId(node._$dlNodes, index, stopId)
            break
    }

    return [index, stop]
}
/**
 * 把DLNodes全部转化成HTMLElements来返回，在执行这个之前需要init
 * @param nodes 
 * @returns 
 */
export function nodesToFlatEls(nodes: DLNode[]) {
    const els = []
    for (let node of nodes) {
        els.push(...nodeToFlatEls(node))
    }
    return els
}

function nodeToFlatEls(node: DLNode) {
    const els: HTMLElement[] = []
    switch (node._$nodeType) {
        case "text":
        case "html":
            els.push(node._$el)
            break
        case "for":
            for (let nodes of node._$dlNodess) {
                els.push(...nodesToFlatEls(nodes))
            }
            break
        case "dlight":
        case "if":
            els.push(...nodesToFlatEls(node._$dlNodes))
            break
    }

    return els
}

/**
 * 四个生命周期
 * @param nodes 
 */
function runDlightNodesLifecycle(nodes: DLNode[], lifecysle: "willMount"|"didMount"|"willUnmount"|"didUnmount") {
    for (let node of nodes) {
        runDlightNodeLifecycle(node, lifecysle)
    }
}
function runDlightNodeLifecycle(node: DLNode, lifecysle: "willMount"|"didMount"|"willUnmount"|"didUnmount") {
    switch (node._$nodeType) {
        case "for":
            for (let nodes of node._$dlNodess) {
                runDlightNodesLifecycle(nodes, lifecysle)
            }
            break
        case "dlight":
            (node as DLightNode)[lifecysle]()
        case "html":
        case "if":
            runDlightNodesLifecycle(node._$dlNodes, lifecysle)
            break
    }
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
