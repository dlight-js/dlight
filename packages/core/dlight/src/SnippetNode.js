import { DLNode, DLNodeType } from "./DLNode"
import { cached } from "./store"

export class SnippetNode extends DLNode {
  constructor(depsArr) {
    super(DLNodeType.Snippet)
    this.depsArr = depsArr
  }

  cached(deps, changed) {
    if (!deps || !deps.length) return false
    const idx = Math.log2(changed)
    const prevDeps = this.depsArr[idx]
    if (cached(deps, prevDeps)) return true
    this.depsArr[idx] = deps
    return false
  }
}
