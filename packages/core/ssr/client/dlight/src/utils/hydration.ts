import { HtmlNode, type CustomNode, type DLNode, TextNode } from "../Nodes"

interface HydrationOption {
  hasEvent?: boolean
  triggersDeps?: string[]
}

function getCustomComponentId(id: string) {
  return id.replace(/:[^:]+?$/, "")
}

export function hydrateElement(func: (element: HtmlNode) => void, parent: DLNode, dlScope: CustomNode, options: HydrationOption, subHydration: (htmlNode: HtmlNode) => void) {
  let { hasEvent, triggersDeps = [] } = options

  // ---- deduplication
  triggersDeps = [...new Set(triggersDeps)]
  // ---- generate dynamic Id
  const dynamicId = `${parent._$id}-${parent._$idx++}`
  const htmlNode = new HtmlNode(dynamicId)

  const hydrateFunc = async() => {
    // ---- get element
    const element: HTMLElement | null = document.querySelector(`[dynamic-id="${dynamicId}"]`)
    if (!element) return // already be hydrated

    // ---- hydrate parent node
    const parentId = getCustomComponentId(parent._$id)
    if (!(window as any).dlNodeMap[parentId]) {
      const willTrigger = triggersDeps.map(prop => (
        (dlScope as any)[`_$$$${prop}`] === "prop"
      )).includes(true)
      if (willTrigger) {
        await (window as any).load(parentId)
        await (window as any).hydrationMap[dlScope._$id]()
      }
    }
    // ---- delete ssr attributes
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
    // ---- init node and add props
    htmlNode._$el = element
    func(htmlNode)
  }
  // ---- add to deps
  for (const dep of triggersDeps) {
    const depFunc = () => {
      void hydrateFunc()
      for (const deleteDep of triggersDeps) {
        ;(dlScope as any)[`_$$${deleteDep}Deps`].delete(depFunc)
      }
    }
    (dlScope as any)[`_$$${dep}Deps`].add(depFunc)
  }
  if (hasEvent) {
    // ---- add to hydrationMap
    (window as any).hydrationMap[dynamicId] = hydrateFunc
  }
  subHydration(htmlNode)
}

export function hydrateText(func: (element: TextNode) => void, parent: DLNode, dlScope: CustomNode, deps: string[]) {
  // ---- generate dynamic Id
  const textIdx = parent._$idx
  const dynamicId = `${parent._$id}:${parent._$idx++}`
  deps = [...new Set(deps)]
  const hydrateFunc = async() => {
    // ---- get element
    const containerElement: HTMLElement | null = document.querySelector(`[text${dynamicId.replace(/:/g, "\\:")}=""]`)
    if (!containerElement) return

    // ---- hydrate parent node
    const parentId = parent._$id.replace(/:[^:]+?$/, "")
    if (!(window as any).dlNodeMap[parentId]) {
      const willTrigger = deps.map(prop => (
        (dlScope as any)[`_$$$${prop}`] === "prop"
      )).includes(true)
      if (willTrigger) {
        await (window as any).load(parentId)
        await (window as any).hydrationMap[dlScope._$id]()
      }
    }
    // ---- delete ssr attributes
    containerElement.removeAttribute(`text${dynamicId}`)
    // ---- init node and add props
    func(new TextNode(dynamicId, containerElement.childNodes[textIdx]))
  }
  // ---- add to deps
  for (const dep of deps) {
    const depFunc = () => {
      void hydrateFunc()
      for (const deleteDep of deps) {
        ;(dlScope as any)[`_$$${deleteDep}Deps`].delete(depFunc)
      }
    }
    (dlScope as any)[`_$$${dep}Deps`].add(depFunc)
  }
}

export function hydrateComponent(func: (dlNode: any) => any, parent: DLNode, dlScope: CustomNode, deps: string[]) {
  const id = `${parent._$id}:${parent._$idx++}`
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
