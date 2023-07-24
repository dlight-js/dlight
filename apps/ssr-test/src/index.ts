// render("app", App)
document.getElementById("app")!.innerHTML = `
<button dynamic-id="jjj-0" dynamic-path="./test" will-click will-mouseover>app ++</button>
<div dynamic-id="jjj-1">0</div>
<div  dynamic-id="fff-0" style="font-size: 10px">
<button dynamic-id="fff-1" dynamic-path="./comp" will-click will-mouseover>comp ++</button>
<div dynamic-id="fff-2">shit 0</div>
</div>

`

console.time("0")
const onEvents = ["click", "mouseover"]
for (const event of onEvents) {
  document.addEventListener(event, e => {
    const el = e.target as HTMLElement
    if (!el?.getAttribute) return
    const hasEvent = el.getAttribute(`will-${event}`)
    if (hasEvent !== "") return
    const eventPath = el.getAttribute("dynamic-path")!

    void import(/* @vite-ignore */eventPath)
      .then(module => {
        const DlView = module.default
        const hydrationMap = module.hydrationMap
        const dynamicId = el.getAttribute("dynamic-id")!
        const [id] = dynamicId.split("-")
        const dlNode = new DlView()
        dlNode._$index = 0
        dlNode._$id = id
        dlNode._$init()
        hydrationMap[dynamicId]()
        el.dispatchEvent(new MouseEvent(event))
      })
  })
}
console.timeEnd("0")
