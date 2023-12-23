import { DLNodeType } from "../DLNode"
import { type AnyDLNode } from "../types"
import { MutableNode } from "./MutableNode"

export class ForNode<T, G> extends MutableNode {
  array
  keys?
  depNum
  nodeFunc
  _$nodes
  nodess

  constructor(array: T[], nodeFunc: (item: T) => AnyDLNode[], depNum: number, keys?: G[]) {
    super(DLNodeType.For)
    this.array = [...array]
    this.nodeFunc = nodeFunc
    this.depNum = depNum
    this.keys = keys

    this.nodess = this.array.map(item => nodeFunc(item))
    this._$nodes = this.nodess.flat(1)
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
    return this.geneNewNodesInEnv(() => this.nodeFunc(this.array[idx]))!
  }

  updateArray(newArray: T[], newKeys?: G[]) {
    if (newKeys) {
      this.updateWithKey(newArray, newKeys)
    } else {
      this.updateWithOutKey(newArray)
    }
  }

  updateArrayItem(prevArray: T[], currArray: T[]) {
    for (let idx = 0; idx < currArray.length; idx++) {
      const currentItem = currArray[idx]
      const prevItem = prevArray[idx]
      if (ForNode.deepEqual(prevItem, currentItem)) continue
      this.nodess[idx][0]._$updateFunc?.(this.depNum, currentItem)
    }
  }

  updateWithOutKey(newArray: T[]) {
    const prevArray = this.array
    const preLength = this.array.length
    const currLength = newArray.length
    this.array = [...newArray]

    if (preLength === currLength) {
      this.updateArrayItem(prevArray, this.array)
      return
    }

    const parentEl = (this as AnyDLNode)._$parentEl
    // ---- If the new array is longer, add new nodes directly
    if (preLength < currLength) {
      let flowIndex = MutableNode.getFlowIndexFromNodes(parentEl._$nodes, this)
      const length = parentEl.childNodes.length
      // ---- Calling parentEl.childNodes.length is time-consuming,
      //      so we use a length variable to store the length
      for (let idx = 0; idx < currLength; idx++) {
        if (idx < preLength) {
          flowIndex += MutableNode.getFlowIndexFromNodes(this.nodess[idx])
          continue
        }
        const newNodes = this.getNewNodes(idx)
        MutableNode.appendNodesWithIndex(newNodes, parentEl, flowIndex, length)
        this.nodess.push(newNodes)
      }
      this._$nodes = this.nodess.flat(1)
      return
    }

    for (let idx = currLength; idx < preLength; idx++) {
      this.removeNodes(this.nodess[idx])
    }
    this.nodess = this.nodess.slice(0, currLength)
    this._$nodes = this.nodess.flat(1)
  }

  updateWithKey(newArray: T[], newKeys: G[]) {
    const prevKeys = this.keys!
    const prevArray = this.array

    this.array = [...newArray]
    this.keys = newKeys

    if (ForNode.arrayEqual(prevKeys, this.keys)) {
      // ---- If the keys are the same, we only need to update the nodes
      this.updateArrayItem(prevArray, this.array)
      return
    }

    const parentEl = (this as AnyDLNode)._$parentEl
    const prevNodess = this.nodess

    // ---- No nodes after, delete all nodes
    if (this.keys.length === 0) {
      const parentNodes = parentEl._$nodes ?? []
      if (parentNodes.length === 1 && parentNodes[0] === this) {
        // ---- ForNode is the only node in the parent node
        parentEl.innerHTML = ""
      } else {
        for (let prevIdx = 0; prevIdx < prevKeys.length; prevIdx++) {
          this.removeNodes(prevNodess[prevIdx])
        }
      }
      this.nodess = []
      this._$nodes = []
      return
    }

    // ---- Record how many nodes are before this ForNode with the same parentNode
    const flowIndex = MutableNode.getFlowIndexFromNodes(parentEl._$nodes, this)

    // ---- No nodes before, append all nodes
    if (prevKeys.length === 0) {
      const nextSibling = parentEl.childNodes[flowIndex]
      for (let idx = 0; idx < this.keys.length; idx++) {
        const newNodes = this.getNewNodes(idx)
        MutableNode.appendNodesWithSibling(newNodes, parentEl, nextSibling)
        this.nodess.push(newNodes)
      }
      this._$nodes = this.nodess.flat(1)
      return
    }

    const shuffleKeys: G[] = []
    const newNodess = []
    const arrToUpdate = []

    // ---- 1. Delete the nodes that are no longer in the array
    for (let prevIdx = 0; prevIdx < prevKeys.length; prevIdx++) {
      const prevKey = prevKeys[prevIdx]
      if (this.keys.includes(prevKey)) {
        shuffleKeys.push(prevKey)
        newNodess.push(prevNodess[prevIdx])
        arrToUpdate.push(prevArray[prevIdx])
        continue
      }
      this.removeNodes(prevNodess[prevIdx])
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
        newFlowIndex += MutableNode.getFlowIndexFromNodes(newNodess[prevIdx])
        // ---- We also need to update them
        const currentItem = this.array[idx]
        const prevItem = arrToUpdate[prevIdx]
        if (!ForNode.deepEqual(prevItem, currentItem)) {
          newNodess[prevIdx][0]._$updateFunc?.(this.depNum, currentItem)
        }
        continue
      }
      const newNodes = this.getNewNodes(idx)
      const count = MutableNode.appendNodesWithIndex(newNodes, parentEl, newFlowIndex, length)
      newFlowIndex += count
      length += count
      newNodess.splice(idx, 0, newNodes)
      shuffleKeys.splice(idx, 0, key)
    }

    if (ForNode.arrayEqual(this.keys, shuffleKeys)) {
      this.nodess = newNodess
      this._$nodes = this.nodess.flat(1)
      return
    }

    newFlowIndex = flowIndex
    const bufferNodes = []
    // ---- 3. Replace the nodes in the same position using Fisher-Yates shuffle algorithm
    for (let idx = 0; idx < this.keys.length; idx++) {
      const key = this.keys[idx]
      const prevIdx = shuffleKeys.indexOf(key)
      if (bufferNodes[idx]) {
        const bufferedNode = bufferNodes[idx]
        const addedElNum = MutableNode.appendNodesWithIndex(
          bufferedNode,
          parentEl,
          newFlowIndex + MutableNode.getFlowIndexFromNodes(bufferedNode),
          length
        )
        newFlowIndex += addedElNum
        length += addedElNum
        delete bufferNodes[idx]
      } else if (prevIdx === idx) {
        newFlowIndex += MutableNode.getFlowIndexFromNodes(newNodess[idx])
        continue
      } else {
        bufferNodes[this.keys.indexOf(shuffleKeys[idx])] = newNodess[idx]
        const addedElNum = MutableNode.appendNodesWithIndex(newNodess[prevIdx], parentEl, newFlowIndex, length)
        newFlowIndex += addedElNum
        length += addedElNum
      }
      const tempNewNodes: AnyDLNode[] = newNodess[idx]
      newNodess[idx] = newNodess[prevIdx]
      newNodess[prevIdx] = tempNewNodes
      const tempKey = shuffleKeys[idx]
      shuffleKeys[idx] = shuffleKeys[prevIdx]
      shuffleKeys[prevIdx] = tempKey
    }

    this.nodess = newNodess
    this._$nodes = this.nodess.flat(1)
  }

  private static deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true
    if (
      typeof obj1 !== "object" || typeof obj2 !== "object" ||
      obj1 == null || obj2 == null
    ) return false

    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) return false

    for (const key of keys1) {
      if (!keys2.includes(key) || !this.deepEqual(obj1[key], obj2[key])) {
        return false
      }
    }

    return true
  }

  private static arrayEqual<T>(arr1: T[], arr2: T[]) {
    if (arr1.length !== arr2.length) return false
    return arr1.every((item, idx) => item === arr2[idx])
  }
}
