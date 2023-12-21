import { describe, it } from "vitest"
import { expectBlock, parse } from "./mock"

describe("HTML", () => {
  it("should test", () => {
    const [blockStatement] = parse(`
      div()
        .innerHTML(this.html)
        .element(this.count[i])
    `)

    expectBlock(blockStatement, "")
  })
  // it("should generate a html node declaration", () => {
  //   const [blockStatement] = parse("div()")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
      
  //     return [node0]
  //   `)
  // })

  // // ---- Props
  // // ---- Static
  // it("should generate a html node declaration with static event listener", () => {
  //   const [blockStatement] = parse("div().onClick(() => {console.log(\"ok\", this.flag)})")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
  //     node0.addEventListener("click", () => {console.log("ok", this.flag)})

  //     return [node0]
  //   `)
  // })

  // it("should generate a html node declaration with static style", () => {
  //   const [blockStatement] = parse("div().style({color: \"red\"})")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
  //     setStyle(node0, { color: "red" })

  //     return [node0]
  //   `)
  // })

  // it("should generate a html node declaration with static attribute", () => {
  //   const [blockStatement] = parse("div().autocapitalize()")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
  //     node0.autocapitalize = true

  //     return [node0]
  //   `)
  // })

  // it("should generate a html node declaration with class property", () => {
  //   const [blockStatement] = parse("div().class(\"ok\")")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
  //     node0.className = "ok"

  //     return [node0]
  //   `)
  // })

  // it("should generate a label node declaration with for property", () => {
  //   const [blockStatement] = parse("label().for(\"ok\")")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("label")
  //     node0.htmlFor = "ok"

  //     return [node0]
  //   `)
  // })

  // it("should generate a html node declaration with content", () => {
  //   const [blockStatement] = parse("div(\"ok\")")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
  //     node0.textContent = "ok"

  //     return [node0]
  //   `)
  // })

  // it("should generate a html node declaration with unknown prop as attribute", () => {
  //   const [blockStatement] = parse("div().unknown(\"ok\")")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
  //     node0.setAttribute("unknown", "ok")

  //     return [node0]
  //   `)
  // })

  // // ---- Dynamic
  // it("should generate a html node declaration with dynamic event listener", () => {
  //   const [blockStatement] = parse("div().onClick(this.flag && this.handleClick)")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
  //     setMemorizedEvent(node0, "click", this.flag && this.handleClick)
  //     const $update = changed => {
  //       if (changed & 1) {
  //         setMemorizedEvent(node0, "click", this.flag && this.handleClick)
  //       }
  //     }

  //     this._$update = $update
  //     return [node0]
  //   `)
  // })

  // it("should generate a html node declaration with dynamic style", () => {
  //   const [blockStatement] = parse("div().style({color: this.count})")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
  //     setStyle(node0, {color: this.count})
  //     const $update = changed => {
  //       if (changed & 3) {
  //         setStyle(node0, {color: this.count})
  //       }
  //     }

  //     this._$update = $update
  //     return [node0]
  //   `)
  // })

  // it("should generate a html node declaration with dynamic attribute", () => {
  //   const [blockStatement] = parse("div().autocapitalize(this.flag)")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
  //     setMemorizedProp(node0, "autocapitalize", this.flag)
  //     const $update = changed => {
  //       if (changed & 1) {
  //         setMemorizedProp(node0, "autocapitalize", this.flag)
  //       }
  //     }

  //     this._$update = $update
  //     return [node0]
  //   `)
  // })

  // it("should generate a html node declaration with dynamic class", () => {
  //   const [blockStatement] = parse("div().class(this.flag ? \"ok\" : \"no\")")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
  //     setMemorizedProp(node0, "className", this.flag ? "ok" : "no")
  //     const $update = changed => {
  //       if (changed & 1) {
  //         setMemorizedProp(node0, "className", this.flag ? "ok" : "no")
  //       }
  //     }

  //     this._$update = $update
  //     return [node0]
  //   `)
  // })

  // it("should generate a html node declaration with dynamic content", () => {
  //   const [blockStatement] = parse("div(this.flag ? \"ok\" : \"no\")")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
  //     setMemorizedProp(node0, "textContent", this.flag ? "ok" : "no")
  //     const $update = changed => {
  //       if (changed & 1) {
  //         setMemorizedProp(node0, "textContent", this.flag ? "ok" : "no")
  //       }
  //     }

  //     this._$update = $update
  //     return [node0]
  //   `)
  // })

  // it("should generate a html node declaration with dynamic unknown prop as attribute", () => {
  //   const [blockStatement] = parse("div().unknown(this.flag ? \"ok\" : \"no\")")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
  //     setMemorizedAttr(node0, "unknown", this.flag ? "ok" : "no")
  //     const $update = changed => {
  //       if (changed & 1) {
  //         setMemorizedAttr(node0, "unknown", this.flag ? "ok" : "no")
  //       }
  //     }

  //     this._$update = $update
  //     return [node0]
  //   `)
  // })

  // // ---- Children
  // it("should generate a html node declaration with children", () => {
  //   const [blockStatement] = parse("div(); {tag(this.div)()}")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
  //     const node1 = createElement(this.div)
  //     node0.appendChild(node1)
  //     node0._$nodes = [node1]

  //     return [node0]
  //   `)
  // })

  // it("should generate a html node declaration with nested children", () => {
  //   const [blockStatement] = parse("div(); {tag(this.div)(); {tag(this.span)()}}")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
  //     const node1 = createElement(this.div)
  //     const node2 = createElement(this.span)
  //     node1.appendChild(node2)
  //     node1._$nodes = [node2]
  //     node0.appendChild(node1)
  //     node0._$nodes = [node1]

  //     return [node0]
  //   `)
  // })

  // it("should generate a html node declaration with nested custom children", () => {
  //   const [blockStatement] = parse("div(); {tag(this.div)(); {tag(this.span)()}}")

  //   expectBlock(blockStatement, `
  //     const node0 = createElement("div")
  //     const node1 = createElement(this.div)
  //     const node2 = createElement(this.span)
  //     node1.appendChild(node2)
  //     node1._$nodes = [node2]
  //     node0.appendChild(node1)
  //     node0._$nodes = [node1]

  //     return [node0]
  //   `)
  // })
})
