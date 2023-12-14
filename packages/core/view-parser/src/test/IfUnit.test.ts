import { expect, describe, it } from "vitest"
import { parse, parseCode, parseView } from "./mock"
import { type HTMLUnit, type IfUnit } from "../types"
import { types as t } from "@babel/core"

describe("IfUnit", () => {
  // ---- Type
  it("should identify an if statement as an IfUnit", () => {
    const viewUnits = parse("if(true) {}")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("if")
  })

  it("should identify an if statement with else clause as an IfUnit", () => {
    const viewUnits = parse("if(true) {} else {}")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("if")
  })

  it("should identify an if statement with else if clause as an IfUnit", () => {
    const viewUnits = parse("if(true) {} else if(false) {}")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("if")
  })

  it("should identify an if statement with else if clause and else clause as an IfUnit", () => {
    const viewUnits = parse("if(true) {} else if(false) {} else {}")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("if")
  })

  // ---- Branch.Condition
  it("should correctly parse the count of conditions for multiple else and else if clauses", () => {
    const viewUnits = parse("if(true) {} else if(false) {} else if(false) {} else {}")
    const ifUnit = viewUnits[0] as IfUnit
    expect(ifUnit.branches.length).toBe(4)
  })

  it("should correctly parse the condition of an if statement", () => {
    const statement = parseCode("if(this.flag) {}")
    const viewUnits = parseView(statement)
    const originalExpression = (statement.body[0] as t.IfStatement).test
    const ifUnit = viewUnits[0] as IfUnit
    expect(ifUnit.branches[0].condition).toBe(originalExpression)
  })

  it("should correctly parse the condition of an else if statement", () => {
    const statement = parseCode("if(true) {} else if(this.flag) {}")
    const viewUnits = parseView(statement)
    const originalExpression = ((statement.body[0] as t.IfStatement).alternate as t.IfStatement).test
    const ifUnit = viewUnits[0] as IfUnit
    expect(ifUnit.branches[1].condition).toBe(originalExpression)
  })

  it("should correctly parse the condition of an else statement as plain true", () => {
    const statement = parseCode("if(true) {} else {}")
    const viewUnits = parseView(statement)
    const ifUnit = viewUnits[0] as IfUnit
    expect(t.isBooleanLiteral(ifUnit.branches[1].condition)).toBeTruthy()
  })

  // ---- Branch.Children
  it("should correctly parse the children of an if statement", () => {
    const viewUnits = parse("if(true) {div()}")
    const ifUnit = viewUnits[0] as IfUnit
    expect(ifUnit.branches[0].children.length).toBe(1)
    expect(ifUnit.branches[0].children[0].type).toBe("html")

    const tag = (ifUnit.branches[0].children[0] as HTMLUnit).tag
    expect(t.isStringLiteral(tag, { value: "div" })).toBeTruthy()
  })
})
