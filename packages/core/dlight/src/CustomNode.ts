import { initNodes } from "./nodes"

export function setDLProp(node: any, name: string, value: any) {
  if (node[`$t$${name}`] !== "prop") return
  node[name] = value
}

export function setDLContent(node: any, value: any) {
  // if (node.$$$content)
}

export function updateDLProp(node: any, key: string, value: any) {
  const valueKey = `$${key}`
  if (node[valueKey] === value) return
  node[valueKey] = value
  node[`$s$${key}`]?.forEach((k: string) => {
    // ---- Not time consuming at all
    if (`$w$${k}` in node) {
      // ---- Watcher
      node[k]()
    } else {
      node[`$${k}`] = node[`$f$${k}`]
    }
  })
  node._$update?.(node[`$$${key}`])
}

export class CompNode {
  _$dlNodeType = "comp"

  _$init() {
    (this as any).willMount?.()
    ;(this as any)._$nodes = (this as any).Body?.() ?? []
    ;(this as any).didMount?.()

    initNodes((this as any)._$nodes, (this as any)._$parentEl)
  }
}

export const View = CompNode as any
