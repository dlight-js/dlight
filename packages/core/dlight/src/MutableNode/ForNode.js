import { DLNodeType } from "../DLNode"
import { DLStore } from "../store"
import { MutableNode } from "./MutableNode"

export class ForNode extends MutableNode {
  array
  keys
  nodeFunc
  depNum

  nodesMap = new Map()

  updateMap = new Map()
  willUnmountMap = new Map()
  didUnmountMap = new Map()

  get _$nodes() {
    const nodes = []
    for (let idx = 0; idx < this.array.length; idx++) {
      nodes.push(...this.nodesMap.get(this.keys?.[idx] ?? idx))
    }
    return nodes
  }

  /**
   * @brief Constructor, For type
   * @param array
   * @param nodeFunc
   * @param keys
   */
  constructor(array, depNum, keys) {
    super(DLNodeType.For)
    this.array = [...array]
    this.keys = keys
    this.depNum = depNum
  }

  addNodeFunc(nodeFunc) {
    this.nodeFunc = nodeFunc
    this.array.forEach((item, idx) => {
      this.initUnmountStore()
      const key = this.keys?.[idx] ?? idx
      const nodes = nodeFunc(item, this.updateMap, key)
      this.nodesMap.set(key, nodes)
      this.setUnmountMap(key)
    })
    // ---- For nested MutableNode, the whole strategy is just like EnvStore
    //      we use array of function array to create "environment", popping and pushing
    ForNode.addWillUnmount(this, this.runAllWillUnmount.bind(this))
    ForNode.addDidUnmount(this, this.runAllDidUnmount.bind(this))
  }

  /**
   * @brief Non-array update function
   * @param changed
   */
  update(changed, ...args) {
    if (changed & this.depNum) return
    this.updateArgs = args
    for (let idx = 0; idx < this.array.length; idx++) {
      this.updateItem(idx, changed)
    }
  }

  /**
   * @brief Update the view related to one item in the array
   * @param nodes
   * @param item
   */
  updateItem(idx, changed) {
    const key = this.keys?.[idx] ?? idx
    // ---- The update function of ForNode's childNodes is stored in the first child node
    this.updateMap.get(key)?.(
      changed ?? this.depNum,
      ...this.updateArgs,
      this.array[idx]
    )
  }

  /**
   * @brief Array-related update function
   * @param newArray
   * @param newKeys
   */
  updateArray(newArray, key, prevValue, newValue, newKeys) {
    this.updateArgs = [key, prevValue, newValue]
    if (newKeys) {
      this.updateWithKey(newArray, newKeys)
      return
    }
    this.updateWithOutKey(newArray)
  }

  /**
   * @brief Shortcut to generate new nodes with idx
   */
  getNewNodes(idx, key) {
    this.initUnmountStore()
    const nodes = this.geneNewNodesInEnv(() =>
      this.nodeFunc(this.array[idx], this.updateMap, key)
    )
    this.setUnmountMap(key)
    this.nodesMap.set(key, nodes)
    return nodes
  }

  setUnmountMap(key) {
    const willUnmountMap = DLStore.global.WillUnmountStore.pop()
    if (willUnmountMap && willUnmountMap.length > 0)
      this.willUnmountMap.set(key, willUnmountMap)
    const didUnmountMap = DLStore.global.DidUnmountStore.pop()
    if (didUnmountMap && didUnmountMap.length > 0)
      this.didUnmountMap.set(key, didUnmountMap)
  }

  runAllWillUnmount() {
    this.willUnmountMap.forEach(funcs => {
      for (let i = 0; i < funcs.length; i++) funcs[i]?.()
    })
  }

  runAllDidUnmount() {
    this.didUnmountMap.forEach(funcs => {
      for (let i = funcs.length - 1; i >= 0; i--) funcs[i]?.()
    })
  }

  runWillUnmount(key) {
    const funcs = this.willUnmountMap.get(key)

    if (!funcs) return
    for (let i = 0; i < funcs.length; i++) funcs[i]?.()
  }

  runDidUnmount(key) {
    const funcs = this.didUnmountMap.get(key)
    if (!funcs) return
    for (let i = funcs.length - 1; i >= 0; i--) funcs[i]?.()
  }

  removeNodes(nodes, key) {
    this.runWillUnmount(key)
    super.removeNodes(nodes)
    this.runDidUnmount(key)
    this.willUnmountMap.delete(key)
    this.didUnmountMap.delete(key)
    this.updateMap.delete(key)
    this.nodesMap.delete(key)
  }

  /**
   * @brief Update the nodes without keys
   * @param newArray
   */
  updateWithOutKey(newArray) {
    const preLength = this.array.length
    const currLength = newArray.length
    this.array = [...newArray]

    if (preLength === currLength) {
      // ---- If the length is the same, we only need to update the nodes
      for (let idx = 0; idx < this.array.length; idx++) {
        this.updateItem(idx)
      }
      return
    }

    const parentEl = this._$parentEl
    // ---- If the new array is longer, add new nodes directly
    if (preLength < currLength) {
      let flowIndex = MutableNode.getFlowIndexFromNodes(parentEl._$nodes, this)
      // ---- Calling parentEl.childNodes.length is time-consuming,
      //      so we use a length variable to store the length
      const length = parentEl.childNodes.length
      for (let idx = 0; idx < currLength; idx++) {
        if (idx < preLength) {
          flowIndex += MutableNode.getFlowIndexFromNodes(this.nodesMap.get(idx))
          this.updateItem(idx)
          continue
        }
        const newNodes = this.getNewNodes(idx, idx)
        MutableNode.appendNodesWithIndex(newNodes, parentEl, flowIndex, length)
        MutableNode.runDidMount()
      }
      return
    }

    // ---- Update the nodes first
    for (let idx = 0; idx < currLength; idx++) {
      this.updateItem(idx)
    }
    // ---- If the new array is shorter, remove the extra nodes
    for (let idx = currLength; idx < preLength; idx++) {
      const nodes = this.nodesMap.get(idx)
      this.removeNodes(nodes, idx)
    }
  }

  /**
   * @brief Update the nodes with keys
   * @param newArray
   * @param newKeys
   */
  updateWithKey(newArray, newKeys) {
    if (newKeys.length !== new Set(newKeys).size) {
      throw new Error("DLight: Duplicate keys in for loop are not allowed")
    }
    const prevKeys = this.keys

    this.array = [...newArray]
    this.keys = newKeys

    if (ForNode.arrayEqual(prevKeys, this.keys)) {
      // ---- If the keys are the same, we only need to update the nodes
      for (let idx = 0; idx < this.array.length; idx++) {
        this.updateItem(idx)
      }
      return
    }

    const parentEl = this._$parentEl

    // ---- No nodes after, delete all nodes
    if (this.keys.length === 0) {
      const parentNodes = parentEl._$nodes ?? []
      if (parentNodes.length === 1 && parentNodes[0] === this) {
        // ---- ForNode is the only node in the parent node
        //      Frequently used in real life scenarios because we tend to always wrap for with a div element,
        //      so we optimize it here
        this.runAllWillUnmount()
        parentEl.innerHTML = ""
        this.runAllDidUnmount()
      } else {
        for (let prevIdx = 0; prevIdx < prevKeys.length; prevIdx++) {
          this.removeNodes(this.nodesMap.get(prevIdx), prevKeys[prevIdx])
        }
      }
      this.nodesMap.clear()
      this.willUnmountMap.clear()
      this.didUnmountMap.clear()
      this.updateMap.clear()
      return
    }

    // ---- Record how many nodes are before this ForNode with the same parentNode
    const flowIndex = MutableNode.getFlowIndexFromNodes(parentEl._$nodes, this)

    // ---- No nodes before, append all nodes
    if (prevKeys.length === 0) {
      const nextSibling = parentEl.childNodes[flowIndex]
      for (let idx = 0; idx < this.keys.length; idx++) {
        const newNodes = this.getNewNodes(idx, this.keys[idx])
        MutableNode.appendNodesWithSibling(newNodes, parentEl, nextSibling)
        MutableNode.runDidMount()
      }
      return
    }

    const shuffleKeys = []

    // ---- 1. Delete the nodes that are no longer in the array
    for (let prevIdx = 0; prevIdx < prevKeys.length; prevIdx++) {
      const prevKey = prevKeys[prevIdx]
      if (this.keys.includes(prevKey)) {
        shuffleKeys.push(prevKey)
        continue
      }
      this.removeNodes(this.nodesMap.get(prevKey), prevKey)
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
        // ---- These nodes are already in the parentEl,
        //      and we need to keep track of their flowIndex
        newFlowIndex += MutableNode.getFlowIndexFromNodes(
          this.nodesMap.get(key)
        )
        // ---- Update the nodes, using old update function and new item
        this.updateMap.get(key)?.(
          this.depNum,
          ...this.updateArgs,
          this.array[idx]
        )
        continue
      }
      const newNodes = this.getNewNodes(idx, key)
      // ---- Add the new nodes
      shuffleKeys.splice(idx, 0, key)

      const count = MutableNode.appendNodesWithIndex(
        newNodes,
        parentEl,
        newFlowIndex,
        length
      )
      MutableNode.runDidMount()
      newFlowIndex += count
      length += count
    }

    // ---- After adding and deleting, the only thing left is to reorder the nodes,
    //      but if the keys are the same, we don't need to reorder
    if (ForNode.arrayEqual(this.keys, shuffleKeys)) return

    newFlowIndex = flowIndex
    const bufferNodes = []
    // ---- 3. Replace the nodes in the same position using Fisher-Yates shuffle algorithm
    for (let idx = 0; idx < this.keys.length; idx++) {
      const key = this.keys[idx]
      const prevIdx = shuffleKeys.indexOf(key)

      const bufferedNode = bufferNodes[idx]
      if (bufferedNode) {
        // ---- If the node is buffered, we need to add it to the parentEl
        const addedElNum = MutableNode.appendNodesWithIndex(
          bufferedNode,
          parentEl,
          newFlowIndex + MutableNode.getFlowIndexFromNodes(bufferedNode),
          length
        )
        newFlowIndex += addedElNum
        length += addedElNum
        bufferNodes[idx] = undefined
      } else if (prevIdx === idx) {
        // ---- If the node is in the same position, we don't need to do anything
        newFlowIndex += MutableNode.getFlowIndexFromNodes(
          this.nodesMap.get(key)
        )
        continue
      } else {
        // ---- If the node is not in the same position, we need to buffer it
        bufferNodes[this.keys.indexOf(shuffleKeys[idx])] = this.nodesMap.get(
          this.keys[prevIdx]
        )
        const addedElNum = MutableNode.appendNodesWithIndex(
          this.nodesMap.get(key),
          parentEl,
          newFlowIndex,
          length
        )
        newFlowIndex += addedElNum
        length += addedElNum
      }
      // ---- Swap the keys
      const tempKey = shuffleKeys[idx]
      shuffleKeys[idx] = shuffleKeys[prevIdx]
      shuffleKeys[prevIdx] = tempKey
    }
  }

  /**
   * @brief Compare two arrays
   * @param arr1
   * @param arr2
   * @returns
   */
  static arrayEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false
    return arr1.every((item, idx) => item === arr2[idx])
  }
}
