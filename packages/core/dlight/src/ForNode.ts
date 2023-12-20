import { appendNodesWithIndex, appendNodesWithSibling, getFlowIndexFromNodes, removeNodes } from "./flowIndex"
import { initNodes } from "./nodes"

export class ForNode {
  _$dlNodeType = "For"
  array
  keys
  depNum
  nodeFunc
  _$nodes
  nodess

  constructor(array: any[], nodeFunc: (item: any) => any[], depNum: number, keys: any[]) {
    this.array = array
    this.nodeFunc = nodeFunc
    this.depNum = depNum
    this.keys = keys

    this.nodess = this.array.map(item => nodeFunc(item))
    this._$nodes = this.nodess.flat(1)
  }

  _$init() {
    this.nodess.forEach(nodes => initNodes(nodes, (this as any)._$parentEl))
  }

  update(changed: number) {
    if (changed === this.depNum) return
    for (let idx = 0; idx < this.array.length; idx++) {
      const item = this.array[idx]
      const nodes = this.nodess[idx]
      nodes[0]._$updateFunc?.(changed, item)
    }
  }

  getNewNodes(idx: number) {
    const newNodes = this.nodeFunc(this.array[idx])
    initNodes(newNodes, (this as any)._$parentEl)
    return newNodes
  }

  updateArray(newArray: any[], newKeys: any[]) {
    const prevKeys = this.keys
    const prevArrays = this.array

    this.array = newArray
    this.keys = newKeys

    if (arrayEqual(prevKeys, this.keys)) {
      // ---- If the keys are the same, we only need to update the nodes
      for (let idx = 0; idx < this.array.length; idx++) {
        const currentItem = this.array[idx]
        const prevItem = prevArrays[idx]
        if (currentItem === prevItem) continue
        this.nodess[idx][0]._$updateFunc?.(this.depNum, currentItem)
      }
      return
    }

    const parentEl = (this as any)._$parentEl
    const prevNodess = this.nodess

    // ---- No nodes after, delete all nodes
    if (this.keys.length === 0) {
      const parentNodes = parentEl._$nodes ?? []
      if (parentNodes.length === 1 && parentNodes[0] === this) {
        // ---- ForNode is the only node in the parent node
        parentEl.innerHTML = ""
      } else {
        for (let prevIdx = 0; prevIdx < prevKeys.length; prevIdx++) {
          removeNodes(parentEl, prevNodess[prevIdx])
        }
      }
      this.nodess = []
      this._$nodes = []
      return
    }

    // ---- Record how many nodes are before this ForNode with the same parentNode
    const flowIndex = getFlowIndexFromNodes(parentEl._$nodes, this)

    // ---- No nodes before, append all nodes
    if (prevKeys.length === 0) {
      const nextSibling = parentEl.childNodes[flowIndex]
      for (let idx = 0; idx < this.keys.length; idx++) {
        const newNodes = this.getNewNodes(idx)
        appendNodesWithSibling(newNodes, parentEl, nextSibling)
        this.nodess.push(newNodes)
      }
      this._$nodes = this.nodess.flat(1)
      return
    }

    const shuffleKeys = []
    const newNodess = []
    const arrToUpdate = []

    // ---- 1. Delete the nodes that are no longer in the array
    for (let prevIdx = 0; prevIdx < prevKeys.length; prevIdx++) {
      const prevKey = prevKeys[prevIdx]
      if (this.keys.includes(prevKey)) {
        shuffleKeys.push(prevKey)
        newNodess.push(prevNodess[prevIdx])
        arrToUpdate.push(prevArrays[prevIdx])
        continue
      }
      removeNodes(parentEl, prevNodess[prevIdx])
    }

    // ---- 2. Add the nodes that are not in the array but in the new array
    // ---- Calling parentEl.childNodes.length is time-consuming,
    //      so we use a length variable to store the length
    let length = parentEl.childNodes.length
    let newFlowIndex = flowIndex
    for (let idx = 0; idx < this.keys.length; idx++) {
      const key = this.keys[idx]
      const prevIdx = shuffleKeys.indexOf(key)
      if (prevIdx !== -1) {
        // ---- These nodes have been replaced,
        //      but we need to keep track of their flowIndex
        newFlowIndex += getFlowIndexFromNodes(newNodess[prevIdx])
        // ---- We also need to update them
        const currentItem = this.array[idx]
        const prevItem = arrToUpdate[prevIdx]
        if (currentItem !== prevItem) {
          newNodess[prevIdx][0]._$updateFunc?.(this.depNum, currentItem)
        }
        continue
      }
      const newNodes = this.getNewNodes(idx)
      const count = appendNodesWithIndex(newNodes, parentEl, newFlowIndex, length)
      newFlowIndex += count
      length += count
      newNodess.splice(idx, 0, newNodes)
      shuffleKeys.splice(idx, 0, key)
    }

    if (arrayEqual(this.keys, shuffleKeys)) {
      this.nodess = newNodess
      this._$nodes = this.nodess.flat(1)
      return
    }

    newFlowIndex = flowIndex
    const bufferNodes = []
    // ---- 3. Replace the nodes in the same position using Fisher-Yates shuffle algorithm
    for (let idx = 0; idx < this.keys.length; idx++) {
      const key = this.keys[idx]
      const prevIdx: any = shuffleKeys.indexOf(key)
      if (bufferNodes[idx]) {
        const bufferedNode = bufferNodes[idx]
        const addedElNum = appendNodesWithIndex(bufferedNode, parentEl, newFlowIndex + getFlowIndexFromNodes(bufferedNode), length)
        newFlowIndex += addedElNum
        length += addedElNum
        delete bufferNodes[idx]
      } else if (prevIdx === idx) {
        newFlowIndex += getFlowIndexFromNodes(newNodess[idx])
        continue
      } else {
        bufferNodes[this.keys.indexOf(shuffleKeys[idx])] = newNodess[idx]
        const addedElNum = appendNodesWithIndex(newNodess[prevIdx], parentEl, newFlowIndex, length)
        newFlowIndex += addedElNum
        length += addedElNum
      }
      const tempNewNodes: any = newNodess[idx]
      newNodess[idx] = newNodess[prevIdx]
      newNodess[prevIdx] = tempNewNodes
      const tempKey: any = shuffleKeys[idx]
      shuffleKeys[idx] = shuffleKeys[prevIdx]
      shuffleKeys[prevIdx] = tempKey
    }

    this.nodess = newNodess
    this._$nodes = this.nodess.flat(1)
  }
}

function arrayEqual(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) return false
  return arr1.every((item, idx) => item === arr2[idx])
}
