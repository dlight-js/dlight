import { type CustomNode } from "../Nodes"

export function initHydration() {
  const hydrationMap: Record<string, () => void> = {}
  function hydrate(func: (element: Element) => void, dlScope: CustomNode, deps?: string[]) {
    const id = (dlScope as any)._$id
    const idx = (dlScope as any)._$index++

    const dynamicId = `${id}-${idx}`

    const hydrateFunc = () => {
      const element = document.querySelector(`[dynamic-id="${dynamicId}"]`)!
      func(element)
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
    hydrationMap[dynamicId] = hydrateFunc

    if (!deps) return
    for (const dep of deps) {
      const depFunc = () => {
        hydrateFunc()
        ;(dlScope as any)[`_$$${dep}Deps`].delete(depFunc)
      }
      (dlScope as any)[`_$$${dep}Deps`].add(depFunc)
    }
  }

  return { hydrate, hydrationMap }
}
