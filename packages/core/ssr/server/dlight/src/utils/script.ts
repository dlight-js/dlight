import { classPathMap, onEvents } from "./dom"

const isProduction = process.env.NODE_ENV === "production"

export function getScript() {
  const classPath = Object.fromEntries(
    Object.entries(classPathMap)
      .map(([key, value]) => {
        key = key.replace("server", "client")
          .replace(".ts", isProduction ? ".js" : "?import")
        return [
          key,
          value
        ]
      })
  )
  const script = `
window.hydrationMap = {}
window.callHydrationMap = async id => {
  await window.hydrationMap[id]()
  delete window.hydrationMap[id]
}
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
${JSON.stringify(onEvents)}.forEach(event => {
  document.addEventListener(event, async e => {
    const el = e.target
    if (!el?.getAttribute) return
    const hasEvent = el.getAttribute(\`will-\${event}\`)
    if (hasEvent !== "") return
    const dynamicId = el.getAttribute("dynamic-id")
    await window.load(dynamicId)
    await window.hydrationMap[dynamicId]()
    delete window.hydrationMap[dynamicId]
    el.dispatchEvent(new MouseEvent(event))
  })
})
`
  onEvents.splice(0, onEvents.length)
  for (const key in classPathMap) {
    delete classPathMap[key]
  }
  return script
}
