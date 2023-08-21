import { classPathMap, onEvents } from "./dom"

export function getScript() {
  const classPath = Object.fromEntries(
    Object.entries(classPathMap)
      .map(([key, value]) => {
        return [
          key
            .replace("server", "client")
            .replace(".ts", "") + "?import",
          [...new Set(value)]
        ]
      })
  )
  return `
window.hydrationMap = {}
window.dlNodeMap = {}
const reversedMap = ${JSON.stringify(classPath)}
const pathMap = Object.entries(reversedMap).reduce((acc, [key, values]) => {
  values.forEach(value => acc[value] = key)
  return acc
}, {})
window.load = async(dynamicId) => {
  const id = dynamicId.replace(/-[^:]+?$/, "")
  const module = await import(pathMap[id])
  const DLClass = module.default
  let dlNode = window.dlNodeMap[id]
  if (!dlNode) {
    dlNode = new DLClass(id)
    dlNode._$id = id
    dlNode._$init()
    window.dlNodeMap[id] = dlNode
  }
  return dlNode
}

const onEvents = ${JSON.stringify(onEvents)}
for (const event of onEvents) {
  document.addEventListener(event, async e => {
    const el = e.target
    if (!el?.getAttribute) return
    const hasEvent = el.getAttribute(\`will-\${event}\`)
    if (hasEvent !== "") return
    const dynamicId = el.getAttribute("dynamic-id")
    await window.load(dynamicId)
    await window.hydrationMap[dynamicId]()
    delete window.hydrationMap[dynamicId]
    console.log(dynamicId, window.hydrationMap)

    el.dispatchEvent(new MouseEvent(event))
  })
}
`
}
