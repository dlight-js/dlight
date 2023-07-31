import { HtmlNode, type CustomNode } from "../Nodes"

interface HydrationOption {
  deps?: string[]
  hasEvent?: boolean
  parentTriggers?: string[]
}

export function hydrateElement(func: (element: HtmlNode) => void, dlScope: CustomNode, options: HydrationOption) {
  const { deps, hasEvent, parentTriggers } = options
  const id = dlScope._$id
  const idx = dlScope._$idx++

  const dynamicId = `${id}:${idx}`

  const hydrateFunc = async() => {
    if (parentTriggers && !dlScope._$parentInited) {
      const parentId = id.replace(/:[^:]+?$/, "")
      await (window as any).load(parentId)
      await window.hydrationMap[id]()
      dlScope._$parentInited = true
    }
    const element: HTMLElement = document.querySelector(`[dynamic-id="${dynamicId}"]`)!
    func(new HtmlNode(element))
    const namesToBeDeleted = []
    for (let i = 0; i < element.attributes.length; i++) {
      const name = element.attributes[i].name
      if (name.startsWith("will-")) {
        namesToBeDeleted.push(name)
      }
    }
    for (const name of namesToBeDeleted) {
      element.removeAttribute(name)
    }
    element.removeAttribute("dynamic-id")
    element.removeAttribute("dynamic-path")
  }
  if (deps) {
    for (const dep of deps) {
      const depFunc = () => {
        hydrateFunc()
        for (const deleteDep of deps) {
          ;(dlScope as any)[`_$$${deleteDep}Deps`].delete(depFunc)
        }
      }
      (dlScope as any)[`_$$${dep}Deps`].add(depFunc)
    }
  }
  if (hasEvent) {
    (window as any).hydrationMap[dynamicId] = hydrateFunc
  }
}

export function hydrateComponent(func: (dlNode: any) => any, dlScope: CustomNode, deps: string[]) {
  const id = `${dlScope._$id}_comp${dlScope._$compIdx++}`

  const updateFunc = async() => {
    const dlNode = await (window as any).load(id)
    func(dlNode)
  }
  (window as any).hydrationMap[id] = updateFunc

  for (const dep of deps) {
    const depFunc = () => {
      void updateFunc()
      for (const deleteDep of deps) {
        ;(dlScope as any)[`_$$${deleteDep}Deps`].delete(depFunc)
      }
    }
    (dlScope as any)[`_$$${dep}Deps`].add(depFunc)
  }
}
