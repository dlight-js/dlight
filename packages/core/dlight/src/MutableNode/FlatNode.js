import { DLStore } from "../store"
import { MutableNode } from "./MutableNode"

export class FlatNode extends MutableNode {
  willUnmountFuncs = []
  didUnmountFuncs = []

  setUnmountFuncs() {
    this.willUnmountFuncs = DLStore.global.WillUnmountStore.pop()
    this.didUnmountFuncs = DLStore.global.DidUnmountStore.pop()
  }

  runWillUnmount() {
    for (let i = 0; i < this.willUnmountFuncs.length; i++)
      this.willUnmountFuncs[i]()
  }

  runDidUnmount() {
    for (let i = this.didUnmountFuncs.length - 1; i >= 0; i--)
      this.didUnmountFuncs[i]()
  }

  removeNodes(nodes) {
    this.runWillUnmount()
    super.removeNodes(nodes)
    this.runDidUnmount()
  }

  geneNewNodesInEnv(newNodesFunc) {
    this.initUnmountStore()
    const nodes = super.geneNewNodesInEnv(newNodesFunc)
    this.setUnmountFuncs()
    return nodes
  }
}
