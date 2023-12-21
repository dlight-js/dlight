import { describe, it } from "vitest"
import { expectBlock, parse } from "./mock"

describe("If", () => {
  it("should generate a For", () => {
    const [blockStatement] = parse(`
      env()
        .hh()
      {
        div()
        Comp()
      }
    `)
    expectBlock(blockStatement, `

    `)
  })
})
