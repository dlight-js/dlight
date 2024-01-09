import { DLNodeType } from "../DLNode"
import { DLStore } from "../store"
import { MutableNode } from "./MutableNode"

export class ForNode extends MutableNode {
  array
  nodeFunc
  depNum

  nodesMap = new Map()
  updateArr = []

  /**
   * @brief Getter for nodes
   */
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

  /**
   * @brief To be called immediately after the constructor
   * @param nodeFunc
   */
  addNodeFunc(nodeFunc) {
    this.nodeFunc = nodeFunc
    this.array.forEach((item, idx) => {
      this.initUnmountStore()
      const key = this.keys?.[idx] ?? idx
      const nodes = nodeFunc(item, this.updateArr, idx)
      this.nodesMap.set(key, nodes)
      this.setUnmountMap(key)
    })
    // ---- For nested ForNode, the whole strategy is just like EnvStore
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
      this.updateItem(idx, this.array, changed)
    }
  }

  /**
   * @brief Update the view related to one item in the array
   * @param nodes
   * @param item
   */
  updateItem(idx, array, changed) {
    // ---- The update function of ForNode's childNodes is stored in the first child node
    this.updateArr[idx]?.(
      changed ?? this.depNum,
      ...this.updateArgs,
      array[idx]
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
   * @brief Shortcut to generate new nodes with idx and key
   */
  getNewNodes(idx, key, array, updateArr) {
    this.initUnmountStore()
    const nodes = this.geneNewNodesInEnv(() =>
      this.nodeFunc(array[idx], updateArr ?? this.updateArr, idx)
    )
    this.setUnmountMap(key)
    this.nodesMap.set(key, nodes)
    return nodes
  }

  /**
   * @brief Set the unmount map by getting the last unmount map from the global store
   * @param key
   */
  setUnmountMap(key) {
    const willUnmountMap = DLStore.global.WillUnmountStore.pop()
    if (willUnmountMap && willUnmountMap.length > 0) {
      if (!this.willUnmountMap) this.willUnmountMap = new Map()
      this.willUnmountMap.set(key, willUnmountMap)
    }
    const didUnmountMap = DLStore.global.DidUnmountStore.pop()
    if (didUnmountMap && didUnmountMap.length > 0) {
      if (!this.didUnmountMap) this.didUnmountMap = new Map()
      this.didUnmountMap.set(key, didUnmountMap)
    }
  }

  /**
   * @brief Run all the unmount functions and clear the unmount map
   */
  runAllWillUnmount() {
    if (!this.willUnmountMap || this.willUnmountMap.size === 0) return
    this.willUnmountMap.forEach(funcs => {
      for (let i = 0; i < funcs.length; i++) funcs[i]?.()
    })
    this.willUnmountMap.clear()
  }

  /**
   * @brief Run all the unmount functions and clear the unmount map
   */
  runAllDidUnmount() {
    if (!this.didUnmountMap || this.didUnmountMap.size === 0) return
    this.didUnmountMap.forEach(funcs => {
      for (let i = funcs.length - 1; i >= 0; i--) funcs[i]?.()
    })
    this.didUnmountMap.clear()
  }

  /**
   * @brief Run the unmount functions of the given key
   * @param key
   */
  runWillUnmount(key) {
    if (!this.willUnmountMap || this.willUnmountMap.size === 0) return
    const funcs = this.willUnmountMap.get(key)
    if (!funcs) return
    for (let i = 0; i < funcs.length; i++) funcs[i]?.()
    this.willUnmountMap.delete(key)
  }

  /**
   * @brief Run the unmount functions of the given key
   */
  runDidUnmount(key) {
    if (!this.didUnmountMap || this.didUnmountMap.size === 0) return
    const funcs = this.didUnmountMap.get(key)
    if (!funcs) return
    for (let i = funcs.length - 1; i >= 0; i--) funcs[i]?.()
    this.didUnmountMap.delete(key)
  }

  /**
   * @brief Remove nodes from parentEl and run willUnmount and didUnmount
   * @param nodes
   * @param key
   */
  removeNodes(nodes, key) {
    this.runWillUnmount(key)
    super.removeNodes(nodes)
    this.runDidUnmount(key)
    this.nodesMap.delete(key)
  }

  /**
   * @brief Update the nodes without keys
   * @param newArray
   */
  updateWithOutKey(newArray) {
    const preLength = this.array.length
    const currLength = newArray.length

    if (preLength === currLength) {
      // ---- If the length is the same, we only need to update the nodes
      for (let idx = 0; idx < this.array.length; idx++) {
        this.updateItem(idx, newArray)
      }
      this.array = [...newArray]
      return
    }
    const parentEl = this._$parentEl
    // ---- If the new array is longer, add new nodes directly
    if (preLength < currLength) {
      let flowIndex = ForNode.getFlowIndexFromNodes(parentEl._$nodes, this)
      // ---- Calling parentEl.childNodes.length is time-consuming,
      //      so we use a length variable to store the length
      const length = parentEl.childNodes.length
      for (let idx = 0; idx < currLength; idx++) {
        if (idx < preLength) {
          flowIndex += ForNode.getFlowIndexFromNodes(this.nodesMap.get(idx))
          this.updateItem(idx, newArray)
          continue
        }
        const newNodes = this.getNewNodes(idx, idx, newArray)
        ForNode.appendNodesWithIndex(newNodes, parentEl, flowIndex, length)
      }
      ForNode.runDidMount()
      this.array = [...newArray]
      return
    }

    // ---- Update the nodes first
    for (let idx = 0; idx < currLength; idx++) {
      this.updateItem(idx, newArray)
    }
    // ---- If the new array is shorter, remove the extra nodes
    for (let idx = currLength; idx < preLength; idx++) {
      const nodes = this.nodesMap.get(idx)
      this.removeNodes(nodes, idx)
    }
    this.updateArr.splice(currLength, preLength - currLength)
    this.array = [...newArray]
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
    this.keys = newKeys

    if (ForNode.arrayEqual(prevKeys, this.keys)) {
      // ---- If the keys are the same, we only need to update the nodes
      for (let idx = 0; idx < newArray.length; idx++) {
        this.updateItem(idx, newArray)
      }
      this.array = [...newArray]
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
          const prevKey = prevKeys[prevIdx]
          this.removeNodes(this.nodesMap.get(prevKey), prevKey)
        }
      }
      this.nodesMap.clear()
      this.updateArr = []
      this.array = []
      return
    }

    // ---- Record how many nodes are before this ForNode with the same parentNode
    const flowIndex = ForNode.getFlowIndexFromNodes(parentEl._$nodes, this)

    // ---- No nodes before, append all nodes
    if (prevKeys.length === 0) {
      const nextSibling = parentEl.childNodes[flowIndex]
      for (let idx = 0; idx < this.keys.length; idx++) {
        const newNodes = this.getNewNodes(idx, this.keys[idx], newArray)
        ForNode.appendNodesWithSibling(newNodes, parentEl, nextSibling)
      }
      ForNode.runDidMount()
      this.array = [...newArray]
      return
    }

    const shuffleKeys = []
    const newUpdateArr = []

    // ---- 1. Delete the nodes that are no longer in the array
    for (let prevIdx = 0; prevIdx < prevKeys.length; prevIdx++) {
      const prevKey = prevKeys[prevIdx]
      if (this.keys.includes(prevKey)) {
        shuffleKeys.push(prevKey)
        newUpdateArr.push(this.updateArr[prevIdx])
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
      if (shuffleKeys.includes(key)) {
        // ---- These nodes are already in the parentEl,
        //      and we need to keep track of their flowIndex
        newFlowIndex += ForNode.getFlowIndexFromNodes(this.nodesMap.get(key))
        this.updateItem(idx, newArray)
        continue
      }
      // ---- Insert updateArr first because in getNewNode the updateFunc will replace this null
      newUpdateArr.splice(idx, 0, null)
      const newNodes = this.getNewNodes(idx, key, newArray, newUpdateArr)
      // ---- Add the new nodes
      shuffleKeys.splice(idx, 0, key)

      const count = ForNode.appendNodesWithIndex(
        newNodes,
        parentEl,
        newFlowIndex,
        length
      )
      newFlowIndex += count
      length += count
    }
    ForNode.runDidMount()

    // ---- After adding and deleting, the only thing left is to reorder the nodes,
    //      but if the keys are the same, we don't need to reorder
    if (ForNode.arrayEqual(this.keys, shuffleKeys)) {
      this.array = [...newArray]
      this.updateArr = newUpdateArr
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
        const addedElNum = ForNode.appendNodesWithIndex(
          bufferedNode,
          parentEl,
          newFlowIndex + ForNode.getFlowIndexFromNodes(bufferedNode),
          length
        )
        newFlowIndex += addedElNum
        length += addedElNum
        bufferNodes[idx] = undefined
      } else if (prevIdx === idx) {
        // ---- If the node is in the same position, we don't need to do anything
        newFlowIndex += ForNode.getFlowIndexFromNodes(this.nodesMap.get(key))
        continue
      } else {
        // ---- If the node is not in the same position, we need to buffer it
        //      We buffer the node of the previous position, and then replace it with the node of the current position
        bufferNodes[this.keys.indexOf(shuffleKeys[idx])] = this.nodesMap.get(
          this.keys[prevIdx]
        )
        const addedElNum = ForNode.appendNodesWithIndex(
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
      const tempUpdateFunc = newUpdateArr[idx]
      newUpdateArr[idx] = newUpdateArr[prevIdx]
      newUpdateArr[prevIdx] = tempUpdateFunc
    }
    this.array = [...newArray]
    this.updateArr = newUpdateArr
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
