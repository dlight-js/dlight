import { type DLNode, DLNodeType } from "../DLNode"
import {
  appendNodesWithIndex,
  deleteNodesDeps,
  removeNodes,
  getFlowIndexFromNodes,
  getFlowIndexFromParentNode,
  arraysEqual
} from "../utils"
import { type CustomNode } from "../CustomNode"
import { type HtmlNode } from "../HtmlNode"
import { MutableNode } from "./MutableNode"

export class ForNode extends MutableNode {
  duplicatedOrNoKey = false
  keys: any[] = []
  array: any[] = []

  _$nodess: DLNode[][] = []
  nodeFunc?: (item: any, idx: number, key: any, nodeFor: ForNode) => DLNode[]
  keyFunc?: (arr: any[]) => any[]
  arrayFunc?: () => any[]
  dlScope?: CustomNode
  dependencies?: string[]

  constructor() {
    super(DLNodeType.For)
  }

  renewKeyAndArray() {
    this.array = this.arrayFunc!()
    if (!this.keyFunc) {
      this.duplicatedOrNoKey = true
      return
    }
    const newKeys = this.keyFunc(this.array)
    // ---- Duplicated key, use index instead
    if (newKeys.length !== new Set(newKeys).size) {
      this.keys = [...Array(this.array.length).keys()]
      // TODO warning
      console.warn("Duplicated Key")
      this.duplicatedOrNoKey = true
      return
    }

    this.keys = newKeys
  }

  /**
   * Get item based on key
   * @param key
   * @param idx
   * @returns
   */
  i(key: any, idx: number) {
    // ---- If duplicated key, use index instead
    const index = this.duplicatedOrNoKey ? idx : this.keys.indexOf(key)
    return this.array[index]
  }

  _$init() {
    if (!this.dependencies || !this.dlScope || this.dependencies.length === 0) {
      if (this.dependencies?.length === 0) this.array = this.arrayFunc!()
      // ---- Already set this._$nodes in transpiler
      this._$bindNodes()
      return
    }
    // ---- Find the HTMLNode as the parentNode, because it has a real element in DOM
    let parentNode: DLNode | undefined = this._$parentNode
    while (parentNode && parentNode._$nodeType !== DLNodeType.HTML) {
      parentNode = parentNode._$parentNode
    }
    if (!parentNode) return

    // ---- 加deps
    // ---* 必须放在上面，不然按顺序run dep会导致初始化的nodes的deps删不掉
    this.dlScope._$addDeps(this.dependencies, this.updateFunc.bind(this, parentNode as HtmlNode), this)

    this.renewKeyAndArray()
    this.array.forEach((item, idx) => {
      this._$nodess.push(this.nodeFunc!(item, idx, this.keys[idx], this))
    })

    this._$nodes = this._$nodess.flat(1)
    this._$bindNodes()
  }

  getNewNodes(idx: number) {
    const nodes = this.nodeFunc!(this.array[idx], idx, this.keys[idx], this)
    this._$bindNewNodes(nodes)
    return nodes
  }

  updateFunc(parentNode: HtmlNode) {
    if (this.duplicatedOrNoKey) {
      this.updateWithOutKey(parentNode)
    } else {
      this.updateWithKey(parentNode)
    }
  }

  updateWithOutKey(parentNode: HtmlNode) {
    const parentEl = parentNode._$el
    const preLength = this.array.length

    this.renewKeyAndArray()
    const currLength = this.array.length
    if (preLength === currLength) return
    // ---- If the new array is longer, add new nodes directly
    if (preLength < currLength) {
      let newFlowIndex = getFlowIndexFromParentNode(parentNode, this)
      // ---- Calling parentEl.childNodes.length is time-consuming,
      //      so we use a length variable to store the length
      let length = parentEl.childNodes.length
      for (let idx = 0; idx < currLength; idx++) {
        if (idx < preLength) {
          // ---- For the nodes that already exist, just update the flowIndex
          newFlowIndex += getFlowIndexFromNodes(this._$nodess[idx])
          continue
        }
        const newNodes = this.getNewNodes(idx)
        ;[newFlowIndex, length] = appendNodesWithIndex(newNodes, newFlowIndex, parentEl, length)
        this._$nodess.push(newNodes)
      }
      this._$nodes = this._$nodess.flat(1)
      return
    }

    for (let idx = currLength; idx < preLength; idx++) {
      deleteNodesDeps(this._$nodess[idx], this.dlScope!)
      removeNodes(parentNode._$el, this._$nodess[idx])
    }
    this._$nodess = this._$nodess.slice(0, currLength)
    this._$nodes = this._$nodess.flat(1)
  }

  updateWithKey(parentNode: HtmlNode) {
    // ---- If the key is provided, the only purpose here is to ensure that
    //      the reference of the element does not change, which will slow down
    const parentEl = parentNode._$el
    const flowIndex = getFlowIndexFromParentNode(parentNode, this)
    const prevKeys = this.keys
    const prevAllNodes = this._$nodess
    const prevNodes = this._$nodes

    this.renewKeyAndArray()
    if (arraysEqual(prevKeys, this.keys)) return

    if (prevKeys.length === 0) {
      let length = parentEl.childNodes.length
      let newFlowIndex = flowIndex
      for (let idx = 0; idx < this.keys.length; idx++) {
        const newNodes = this.getNewNodes(idx)
        ;[newFlowIndex, length] = appendNodesWithIndex(newNodes, newFlowIndex, parentEl, length)
        this._$nodess.push(newNodes)
      }
      this._$nodes = this._$nodess.flat(1)
      return
    }

    if (this.keys.length === 0) {
      for (let prevIdx = 0; prevIdx < prevKeys.length; prevIdx++) {
        deleteNodesDeps(prevAllNodes[prevIdx], this.dlScope!)
        removeNodes(parentNode._$el, prevAllNodes[prevIdx])
      }
      this._$nodess = []
      this._$nodes = []
      return
    }

    const shuffleKeys = []
    const newDlNodes = []

    // ---- 1. Delete the nodes that are no longer in the array
    for (let prevIdx = 0; prevIdx < prevKeys.length; prevIdx++) {
      const prevKey = prevKeys[prevIdx]
      if (this.keys.includes(prevKey)) {
        shuffleKeys.push(prevKey)
        newDlNodes.push(prevAllNodes[prevIdx])
        continue
      }
      deleteNodesDeps(prevAllNodes[prevIdx], this.dlScope!)
      removeNodes(parentNode._$el, prevAllNodes[prevIdx])
    }

    // ---- 2. Add the nodes that are not in the array but in the new array
    // ---- Calling parentEl.childNodes.length is time-consuming,
    //      so we use a length variable to store the length
    let length = parentEl.childNodes.length
    let newFlowIndex = flowIndex
    for (let idx = 0; idx < this.keys.length; idx++) {
      const key = this.keys[idx]
      if (shuffleKeys.includes(key)) {
        // ---- These nodes have been replaced,
        //      but we need to keep track of their flowIndex
        newFlowIndex += getFlowIndexFromNodes(newDlNodes[shuffleKeys.indexOf(key)])
        continue
      }
      const newNodes = this.getNewNodes(idx)
      ;[newFlowIndex, length] = appendNodesWithIndex(newNodes, newFlowIndex, parentEl, length)
      newDlNodes.splice(idx, 0, newNodes)
      shuffleKeys.splice(idx, 0, key)
    }

    newFlowIndex = flowIndex

    const bufferNodes = []
    // ---- 3. Replace the nodes in the same position using Fisher-Yates shuffle algorithm
    for (let idx = 0; idx < this.keys.length; idx++) {
      const key = this.keys[idx]
      const prevIdx = shuffleKeys.indexOf(key)
      if (bufferNodes[idx]) {
        const bufferedNode = bufferNodes[idx]
        ;[newFlowIndex, length] = appendNodesWithIndex(bufferedNode, newFlowIndex + getFlowIndexFromNodes(bufferedNode), parentEl, length)
        delete bufferNodes[idx]
      } else if (prevIdx === idx) {
        newFlowIndex += getFlowIndexFromNodes(newDlNodes[idx])
        continue
      } else {
        bufferNodes[this.keys.indexOf(shuffleKeys[idx])] = newDlNodes[idx]
        ;[newFlowIndex, length] = appendNodesWithIndex(newDlNodes[prevIdx], newFlowIndex, parentEl, length)
      }
      ;[newDlNodes[idx], newDlNodes[prevIdx]] = [newDlNodes[prevIdx], newDlNodes[idx]]
      ;[shuffleKeys[idx], shuffleKeys[prevIdx]] = [shuffleKeys[prevIdx], shuffleKeys[idx]]
    }

    this._$nodess = newDlNodes
    this._$nodes = this._$nodess.flat(1)

    this.onUpdateNodes(prevNodes, this._$nodes)
  }
}
