
export function loopDLNodes(nodes: any[], runFunc: (node: any, isDL: boolean) => (boolean | void)) {
  const stack = [...nodes]
  while (stack.length > 0) {
    const node = stack.shift()!
    const isDL = "_$dlNodeType" in node
    if (runFunc(node, isDL) === false) break
    stack.unshift(...node._$nodes ?? [])
  }
}

export function loopShallowDLNodes(nodes: any[], runFunc: (node: any, isDL: boolean) => (boolean | void)) {
  const stack = [...nodes]
  while (stack.length > 0) {
    const node = stack.shift()!
    const isDL = "_$dlNodeType" in node
    if (runFunc(node, isDL) === false) break
    if (isDL) {
      stack.unshift(...node._$nodes ?? [])
    }
  }
}

export function loopShallowEls(nodes: any[], runFunc: (el: HTMLElement) => (boolean | void)) {
  const stack = [...nodes]
  while (stack.length > 0) {
    const node = stack.shift()!
    const isDL = "_$dlNodeType" in node
    if (!isDL) {
      if (runFunc(node) === false) break
    } else {
      stack.unshift(...node._$nodes ?? [])
    }
  }
}

export function initNodes(nodes: any[], parentEl: HTMLElement) {
  nodes?.forEach(node => {
    if ("_$dlNodeType" in node) {
      node._$parentEl = parentEl
      node._$init?.()
    }
  })
}


// export function initNode(node: any) {
//   initNodes(node._$nodes ?? [])
// }

// export function initNodes(nodes: any[]) {
//   loopDLNodes(nodes, node => {
//     console.log(node)
//     node._$init?.()
//   })
// }
