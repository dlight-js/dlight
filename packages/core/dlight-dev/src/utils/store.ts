export interface GraphNode {
  id: string
  children: GraphNode[]
}

interface DevStore {
  nodes: GraphNode[]
  updateFunc: (target: any, prop: string) => void
}

const devStoreObj: DevStore = {
  nodes: [],
  updateFunc: () => {}
}

export const devStore = new Proxy(devStoreObj, {
  set(target, prop, value) {
    if (prop === "updateFunc") {
      ;(target as any)[prop] = value
      return true
    }
    console.log("what")
    ;(target as any)[prop] = value
    target.updateFunc(target, prop as any)
    return true
  }
})

;(window as any).devStore = devStore
