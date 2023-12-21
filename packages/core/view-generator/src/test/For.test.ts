import { describe, it } from "vitest"
import { expectBlock, parse } from "./mock"

describe("For", () => {
  it("should generate a For", () => {
      const [blockStatement] = parse(`
      for (const i of this.array) {
        div(i)
      }
      `)
      expectBlock(blockStatement, "")
    })
  // it("should generate a For", () => {
  //   const [blockStatement] = parse("for (const i of this.array) {div()}")
  //   expectBlock(blockStatement, `
  //     const node0 = new ForNode(this.array, (i) => {
  //       const node0 = createElement("div")
  //       return [node0]
  //     })
  //     const $update = changed => {
  //       if (changed & 19) {
  //         node0.updateArray(this.array)
  //       }
  //       node0.update(changed)
  //     };
  //     this._$update = $update;

      
  //     return [node0]
  //   `)
  // })

  // it("should generate a For with sub dependency", () => {
  //   const [blockStatement] = parse("for (const i of this.array) {div(this.count)}")
  //   expectBlock(blockStatement, `
  //   const node0 = new ForNode(this.array, (i) => {
  //     const node0 = createElement("div")
  //     setMemorizedProp(node0, "textContent", this.count)
  //     const $update = changed => {
  //       if (changed & 3) {
  //         setMemorizedProp(node0, "textContent", this.count)
  //       }
  //     }
  //     node0._$updateFunc = $update
  //     return [node0]
  //   })
  //   const $update = changed => {
  //     if (changed & 19) {
  //       node0.updateArray(this.array)
  //     }
  //     node0.update(changed)
  //   };
  //   this._$update = $update;

    
  //   return [node0]
  //   `)
  // })
})
