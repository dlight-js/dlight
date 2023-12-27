import { expect, describe, it } from "vitest"
import { parse, parseCode, parseView } from "./mock"
import { type SwitchUnit } from "../types"
import { types as t } from "@babel/core"

describe("SwitchUnit", () => {
  // ---- Type
  it("should identify an switch statement as an SwitchUnit", () => {
    const viewUnits = parse("switch(true) {}")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("switch")
  })

  it("should identify an switch statement with cases", () => {
    const viewUnits = parse("switch(true) { case 1: break; }")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("switch")
    expect((viewUnits[0] as SwitchUnit).branches.length).toBe(1)
  })

  it("should identify an switch statement with cases and default", () => {
    const viewUnits = parse("switch(true) { case 1: break; default: break; }")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("switch")
    expect((viewUnits[0] as SwitchUnit).branches.length).toBe(2)
  })

  // ---- Discriminant
  it("should correctly parse the discriminant of an switch statement", () => {
    const statement = parseCode("switch(this.flag) {}")
    const viewUnits = parseView(statement)
    const originalExpression = (statement.body[0] as t.SwitchStatement)
      .discriminant
    const switchUnit = viewUnits[0] as SwitchUnit
    expect(switchUnit.discriminant).toBe(originalExpression)
  })

  // ---- Branches
  it("should correctly parse the count of branches", () => {
    const viewUnits = parse(
      "switch(true) { case 1: break; case 2: break; case 3: break; }"
    )
    const switchUnit = viewUnits[0] as SwitchUnit
    expect(switchUnit.branches.length).toBe(3)
  })

  it("should correctly parse the case of a branch", () => {
    const statement = parseCode("switch(true) { case this.flag: break; }")
    const viewUnits = parseView(statement)
    const originalExpression = (
      (statement.body[0] as t.SwitchStatement).cases[0] as t.SwitchCase
    ).test
    const switchUnit = viewUnits[0] as SwitchUnit
    expect(switchUnit.branches[0].case).toBe(originalExpression)
  })

  // ---- Break
  it("should correctly parse the break of a branch", () => {
    const viewUnits = parse("switch(true) { case 1: break; }")

    const switchUnit = viewUnits[0] as SwitchUnit
    expect(switchUnit.branches[0].break).toBe(true)
    expect(switchUnit.branches[0].children.length).toBe(0)
  })
})
