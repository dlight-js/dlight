// render("app", App)

document.getElementById("app")!.innerHTML = `
<button will-click="" will-mouseover="" dynamic-id=":0:0">+</button><div dynamic-id=":0:1">0</div><div dynamic-id=":0:2:0">shit0</div><div dynamic-id=":0:2:1">fuck0</div><button will-click="" dynamic-id=":0:2:2"></button><div dynamic-id=":0:3:0">shit0</div><div dynamic-id=":0:3:1">fuck0</div><button will-click="" dynamic-id=":0:3:2"></button>
`
// `
// <div  dynamic-id="fff-0" style="font-size: 10px">
//   <button dynamic-id="fff-1" dynamic-path="./comp" will-click will-mouseover>comp ++</button>
//   <button dynamic-id="fff-2" dynamic-path="./comp" will-click will-mouseover>comp ++</button>
//   <div dynamic-id="fff-3">shit 0</div>
// </div>
// `

window.hydrationMap = {}
window.dlNodeMap = {}
const pathMap: Record<string, string> = {
  jjj: "./test",
  jjj_comp0: "./ok",
  jjj_comp1: "./ok"
}
window.load = async(dynamicId: string) => {
  const id = dynamicId.replace(/:[^:]+?$/, "")

  const module = await import(/* @vite-ignore */pathMap[id])
  const DLClass = module.default
  let dlNode = window.dlNodeMap[id]
  if (!dlNode) {
    dlNode = new DLClass(id)
    dlNode._$init()
    window.dlNodeMap[id] = dlNode
  }
  return dlNode
}

const onEvents = ["click", "mouseover"]
for (const event of onEvents) {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  document.addEventListener(event, async e => {
    const el = e.target as HTMLElement
    if (!el?.getAttribute) return
    const hasEvent = el.getAttribute(`will-${event}`)
    if (hasEvent !== "") return
    const dynamicId = el.getAttribute("dynamic-id")!
    await window.load(dynamicId)
    await window.hydrationMap[dynamicId]()
    el.dispatchEvent(new MouseEvent(event))
  })
}

class DynamicIdGenerator {
  private static readonly charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  private static readonly step = 500

  private current = 0

  private static decimalToBase62(decimal: number) {
    let result = ""
    if (decimal === 0) {
      return "0"
    }
    const base = this.charset.length
    while (decimal > 0) {
      result = this.charset[decimal % base] + result
      decimal = Math.floor(decimal / base)
    }
    return result
  }

  private static base62ToDecimal(base62: string) {
    const base = this.charset.length
    let result = 0
    for (let i = 0; i < base62.length; i++) {
      result = result * base + this.charset.indexOf(base62[i])
    }
    return result
  }

  newChain() {
    let current = this.current
    this.current++
    return {
      next() {
        const dynamicId = DynamicIdGenerator.decimalToBase62(current)
        current += DynamicIdGenerator.step
        return dynamicId
      }
    }
  }

  static next(base62: string) {
    return this.decimalToBase62(
      this.base62ToDecimal(base62) + this.step
    )
  }

  static prev(base62: string) {
    return this.decimalToBase62(
      this.base62ToDecimal(base62) - this.step
    )
  }
}

const a = new DynamicIdGenerator()
const b = a.newChain()

console.log(b.next())
console.log(b.next())
console.log(b.next())
console.log(b.next())
