import { type DLNode, DLNodeType } from "../DLNode"
import {
  appendNodesWithIndex,
  deleteNodesDeps,
  removeNodes,
  getFlowIndexFromNodes,
  getFlowIndexFromParentNode,
  arraysEqual,
  appendNodesWithSibling
} from "../utils"
import { type CustomNode } from "../CustomNode"
import { type HtmlNode } from "../HtmlNode"
import { MutableNode } from "./MutableNode"

export class ForNode extends MutableNode {
  dupOrNoKey = false
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
      this.dupOrNoKey = true
      return
    }
    const newKeys = this.keyFunc(this.array)
    // ---- Duplicated key, use index instead
    if (newKeys.length !== new Set(newKeys).size) {
      this.keys = [...Array(this.array.length).keys()]
      // TODO warning
      console.warn("Duplicated Key")
      this.dupOrNoKey = true
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
    const index = this.dupOrNoKey ? idx : this.keys.indexOf(key)
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

    // ---- Remove future useless properties
    delete this.dependencies
  }

  getNewNodes(idx: number) {
    const nodes = this.nodeFunc!(this.array[idx], idx, this.keys[idx], this)
    this._$bindNewNodes(nodes)
    return nodes
  }

  updateFunc(parentNode: HtmlNode) {
    if (this.dupOrNoKey) return this.updateWithOutKey(parentNode)
    return this.updateWithKey(parentNode)
  }

  updateWithOutKey(parentNode: HtmlNode) {
    const preLength = this.array.length
    this.renewKeyAndArray()
    const currLength = this.array.length
    if (preLength === currLength) return

    const parentEl = parentNode._$el
    // ---- If the new array is longer, add new nodes directly
    if (preLength < currLength) {
      const flowIndex = getFlowIndexFromParentNode(parentNode, this)
      const nextSibling = parentEl.childNodes[flowIndex]
      // ---- Calling parentEl.childNodes.length is time-consuming,
      //      so we use a length variable to store the length
      for (let idx = preLength; idx < currLength; idx++) {
        const newNodes = this.getNewNodes(idx)
        appendNodesWithSibling(newNodes, parentEl, nextSibling)
        this._$nodess.push(newNodes)
      }
      this._$nodes = this._$nodess.flat(1)
      return
    }

    for (let idx = currLength; idx < preLength; idx++) {
      deleteNodesDeps(this._$nodess[idx], this.dlScope!)
      removeNodes(parentEl, this._$nodess[idx])
    }
    this._$nodess = this._$nodess.slice(0, currLength)
    this._$nodes = this._$nodess.flat(1)
  }

  /**
   * @brief Update nodes with key
   *  If the key is provided, the only purpose here is to ensure that
   *  the reference of the element does not change, which will slow down
   * @param parentNode
   * @returns
   */
  updateWithKey(parentNode: HtmlNode) {
    const prevKeys = this.keys
    this.renewKeyAndArray()

    // ---- No need to update at all
    if (arraysEqual(prevKeys, this.keys)) return

    const prevNodess = this._$nodess
    const parentEl = parentNode._$el

    // ---- No nodes after, delete all nodes
    if (this.keys.length === 0) {
      for (let prevIdx = 0; prevIdx < prevKeys.length; prevIdx++) {
        deleteNodesDeps(prevNodess[prevIdx], this.dlScope!)
        removeNodes(parentEl, prevNodess[prevIdx])
      }
      this.nodesUpdate([])
      return
    }

    // ---- Record how many nodes are before this ForNode with the same parentNode
    const flowIndex = getFlowIndexFromParentNode(parentNode, this)

    // ---- No nodes before, append all nodes
    if (prevKeys.length === 0) {
      const nextSibling = parentEl.childNodes[flowIndex]
      for (let idx = 0; idx < this.keys.length; idx++) {
        const newNodes = this.getNewNodes(idx)
        appendNodesWithSibling(newNodes, parentEl, nextSibling)
        this._$nodess.push(newNodes)
      }
      this._$nodes = this._$nodess.flat(1)
      return
    }

    const shuffleKeys = []
    const newNodess = []

    // ---- 1. Delete the nodes that are no longer in the array
    for (let prevIdx = 0; prevIdx < prevKeys.length; prevIdx++) {
      const prevKey = prevKeys[prevIdx]
      if (this.keys.includes(prevKey)) {
        shuffleKeys.push(prevKey)
        newNodess.push(prevNodess[prevIdx])
        continue
      }
      deleteNodesDeps(prevNodess[prevIdx], this.dlScope!)
      removeNodes(parentEl, prevNodess[prevIdx])
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
        newFlowIndex += getFlowIndexFromNodes(newNodess[shuffleKeys.indexOf(key)])
        continue
      }
      const newNodes = this.getNewNodes(idx)
      const addedElNum = appendNodesWithIndex(newNodes, parentEl, newFlowIndex, length)
      newFlowIndex += addedElNum
      length += addedElNum
      newNodess.splice(idx, 0, newNodes)
      shuffleKeys.splice(idx, 0, key)
    }

    // ---- No need to shuffle
    if (arraysEqual(this.keys, shuffleKeys)) {
      this.nodesUpdate(newNodess)
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
      ;[newNodess[idx], newNodess[prevIdx]] = [newNodess[prevIdx], newNodess[idx]]
      ;[shuffleKeys[idx], shuffleKeys[prevIdx]] = [shuffleKeys[prevIdx], shuffleKeys[idx]]
    }

    this.nodesUpdate(newNodess)
  }

  nodesUpdate(nodess: DLNode[][]) {
    // const prevNodes = this._$nodes
    this._$nodess = nodess
    this._$nodes = this._$nodess.flat(1)
    // this.onUpdateNodes(prevNodes, this._$nodes)
  }
}
