import { describe, it } from "vitest"
import { expectBlock, parse } from "./mock"

describe("Comp", () => {
  it("should generate a Comp", () => {
    const [blockStatement] = parse(`
      MyComp()
        .flag(this.flag)
    `)
    expectBlock(blockStatement, "")
  })
  // it("should generate a Comp", () => {
  //   const [blockStatement] = parse("MyComp()")
  //   expectBlock(blockStatement, `
  //     const node0 = new MyComp()
      
  //     return [node0]
  //   `)
  // })

  // it("should generate a Comp with props", () => {
  //   const [blockStatement] = parse("MyComp().flag(true)")
  //   expectBlock(blockStatement, `
  //     const node0 = new MyComp()
  //     setDLProp(node0, "flag", true)
      
  //     return [node0]
  //   `)
  // })

  // it("should generate a Comp with content", () => {
  //   const [blockStatement] = parse("MyComp(\"ok\")")
  //   expectBlock(blockStatement, `
  //     const node0 = new MyComp()
  //     setDLContent(node0, "ok")
      
  //     return [node0]
  //   `)
  // })

  // it("should generate a Comp with props as dynamic", () => {
  //   const [blockStatement] = parse("MyComp().flag(this.flag)")
  //   expectBlock(blockStatement, `
  //     const node0 = new MyComp()
  //     setDLProp(node0, "flag", this.flag)
  //     const $update = changed => {
  //       if (changed & 1) {
  //         setDLProp(node0, "flag", this.flag)
  //       }
  //     }

  //     this._$update = $update
  //     return [node0]
  //   `)
  // })
})
