import { DLNodeType } from "../DLNode"
import { DLStore } from "../store"
import { MutableNode } from "./MutableNode"

export class ForNode extends MutableNode {
  array
  keys
  nodeFunc
  nodess
  depNum

  updateArr = []

  willUnmountArr = []
  didUnmountArr = []

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
    this.nodess = this.array.map((item, idx) => {
      this.initUnmountStore()
      const nodes = nodeFunc(item, this.updateArr, idx)
      this.willUnmountArr[idx] = DLStore.global.WillUnmountStore.pop()
      this.didUnmountArr[idx] = DLStore.global.DidUnmountStore.pop()
      return nodes
    })
    this._$nodes = this.nodess.flat(1)

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
    // ---- The update function of ForNode's childNodes is stored in the first child node
    this.updateArr[idx]?.(
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
  getNewNodes(idx) {
    this.initUnmountStore()
    const nodes = this.geneNewNodesInEnv(() =>
      this.nodeFunc(this.array[idx], this.updateArr, idx)
    )
    this.willUnmountArr[idx] = DLStore.global.WillUnmountStore.pop()
    this.didUnmountArr[idx] = DLStore.global.DidUnmountStore.pop()
    return nodes
  }

  /**
   * @brief Shortcut to generate new nodes with idx
   */
  getNewNodesSliced(idx, updateArr) {
    this.initUnmountStore()
    const nodes = this.geneNewNodesInEnv(() =>
      this.nodeFunc(this.array[idx], updateArr, idx)
    )

    return [
      nodes,
      DLStore.global.WillUnmountStore.pop(),
      DLStore.global.DidUnmountStore.pop(),
    ]
  }

  runAllWillUnmount() {
    for (let idx = 0; idx < this.willUnmountArr.length; idx++) {
      this.runWillUnmount(idx)
    }
  }

  runAllDidUnmount() {
    for (let idx = this.didUnmountArr.length - 1; idx >= 0; idx--) {
      this.runDidUnmount(idx)
    }
  }

  runWillUnmount(idx) {
    const willMountArr = this.willUnmountArr[idx]
    if (!willMountArr || willMountArr.length === 0) return
    for (let i = 0; i < willMountArr.length; i++) willMountArr[i]?.()
  }

  runDidUnmount(idx) {
    const didMountArr = this.didUnmountArr[idx]
    if (!didMountArr || didMountArr.length === 0) return
    for (let i = didMountArr.length - 1; i >= 0; i--) didMountArr[i]?.()
  }

  removeNodes(nodes, idx) {
    this.runWillUnmount(idx)
    super.removeNodes(nodes)
    this.runDidUnmount(idx)
  }

  /**
   * @brief Update the nodes without keys
   * @param newArray
   */
  updateWithOutKey(newArray) {
    const preLength = this.array.length
    const currLength = newArray.length
    this.array = [...newArray]
    this.updateArr = this.updateArr.slice(0, currLength)

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
          flowIndex += MutableNode.getFlowIndexFromNodes(this.nodess[idx])
          this.updateItem(idx)
          continue
        }
        const newNodes = this.getNewNodes(idx)
        MutableNode.appendNodesWithIndex(newNodes, parentEl, flowIndex, length)
        MutableNode.runDidMount()
        this.nodess.push(newNodes)
      }
      this._$nodes = this.nodess.flat(1)
      return
    }

    // ---- Update the nodes first
    for (let idx = 0; idx < currLength; idx++) {
      this.updateItem(idx)
    }
    // ---- If the new array is shorter, remove the extra nodes
    for (let idx = currLength; idx < preLength; idx++) {
      this.removeNodes(this.nodess[idx], idx)
    }
    this.willUnmountArr = this.willUnmountArr.slice(0, currLength)
    this.didUnmountArr = this.didUnmountArr.slice(0, currLength)
    this.nodess = this.nodess.slice(0, currLength)
    this._$nodes = this.nodess.flat(1)
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
    const prevNodess = this.nodess

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
          this.removeNodes(prevNodess[prevIdx], prevIdx)
        }
      }
      this.nodess = []
      this._$nodes = []
      this.updateArr = []
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
        MutableNode.runDidMount()
        this.nodess.push(newNodes)
      }
      this._$nodes = this.nodess.flat(1)
      return
    }

    const shuffleKeys = []
    const newNodess = []
    // ---- [shuffleKey, newNodes, updateArr, willUnmountArr, didUnmountArr]
    const newFuncs = []

    // ---- 1. Delete the nodes that are no longer in the array
    for (let prevIdx = 0; prevIdx < prevKeys.length; prevIdx++) {
      const prevKey = prevKeys[prevIdx]
      if (this.keys.includes(prevKey)) {
        shuffleKeys.push(prevKey)
        newNodess.push(prevNodess[prevIdx])
        newFuncs.push([
          this.updateArr[prevIdx],
          this.willUnmountArr[prevIdx],
          this.didUnmountArr[prevIdx],
        ])
        continue
      }
      this.removeNodes(prevNodess[prevIdx], prevIdx)
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
        newFlowIndex += MutableNode.getFlowIndexFromNodes(newNodess[prevIdx])
        // ---- Update the nodes, using old update function and new item
        this.updateArr[prevIdx]?.(
          this.depNum,
          ...this.updateArgs,
          this.array[idx]
        )
        continue
      }
      // ---- Insert updateArr first because in getNewNode the updateFunc will replace this null
      const updateArr = []
      const [newNodes, willUnmountFunc, didUnmountFunc] =
        this.getNewNodesSliced(idx, updateArr)
      // ---- Add the new nodes
      newFuncs.splice(idx, 0, [updateArr[idx], willUnmountFunc, didUnmountFunc])
      newNodess.splice(idx, 0, newNodes)
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
    if (ForNode.arrayEqual(this.keys, shuffleKeys)) {
      this.nodess = newNodess
      this._$nodes = this.nodess.flat(1)
      this.updateArr = []
      this.willUnmountArr = []
      this.didUnmountArr = []
      for (const [update, willUnmount, didUnmount] of newFuncs) {
        this.updateArr.push(update)
        this.willUnmountArr.push(willUnmount)
        this.didUnmountArr.push(didUnmount)
      }

      return
    }

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
        newFlowIndex += MutableNode.getFlowIndexFromNodes(newNodess[idx])
        continue
      } else {
        // ---- If the node is not in the same position, we need to buffer it
        bufferNodes[this.keys.indexOf(shuffleKeys[idx])] = newNodess[idx]
        const addedElNum = MutableNode.appendNodesWithIndex(
          newNodess[prevIdx],
          parentEl,
          newFlowIndex,
          length
        )
        newFlowIndex += addedElNum
        length += addedElNum
      }
      // ---- Swap the nodes
      const tempNewNodes = newNodess[idx]
      newNodess[idx] = newNodess[prevIdx]
      newNodess[prevIdx] = tempNewNodes
      const tempKey = shuffleKeys[idx]
      shuffleKeys[idx] = shuffleKeys[prevIdx]
      shuffleKeys[prevIdx] = tempKey
      const tempFunc = newFuncs[idx]
      newFuncs[idx] = newFuncs[prevIdx]
      newFuncs[prevIdx] = tempFunc
    }

    this.nodess = newNodess
    this._$nodes = this.nodess.flat(1)
    this.updateArr = []
    this.willUnmountArr = []
    this.didUnmountArr = []
    for (const [update, willUnmount, didUnmount] of newFuncs) {
      this.updateArr.push(update)
      this.willUnmountArr.push(willUnmount)
      this.didUnmountArr.push(didUnmount)
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
