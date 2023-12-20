import { describe, it } from "vitest"
import { expectBlock, parse } from "./mock"

describe("If", () => {
  it("should generate a For", () => {
    const [blockStatement] = parse(`
      if (this.flag) {
        div()
      } else if (this.count > 100) {
        span()
        div("hh")
      } 
    
    `)
    expectBlock(blockStatement, `

      return [node0]
    `)
  })

 
})
