import { expect, describe, it } from "vitest"
import { parse, parseCode, parseView } from "./mock"
import { type ForUnit } from "../types"
import { types as t } from "@babel/core"

describe("ForUnit", () => {
  // ---- Type
  it("should identify a for-of statement as a ForUnit", () => {
    const viewUnits = parse("for (const item of array) { div() }")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("for")
  })

  it("should log an error if there's a for-in statement", () => {
    const statement = parseCode("for (const item in array) { }")
    const viewUnits = parseView(statement)
    expect(viewUnits.length).toBe(0)
  })

  it("should drop the for-of statement if the block statement is empty", () => {
    const viewUnits = parse("for (const item of array) { }")
    expect(viewUnits.length).toBe(0)
  })

  // ---- Item
  it("should correctly parse the item of a for-of statement", () => {
    const statement = parseCode("for (const item of array) { div() }")
    const viewUnits = parseView(statement)
    const originalExpression = (
      (statement.body[0] as t.ForOfStatement).left as t.VariableDeclaration
    ).declarations[0].id
    const forUnit = viewUnits[0] as ForUnit
    expect(forUnit.item).toBe(originalExpression)
  })

  it("should correctly parse the item of a for-of statement with a destructuring pattern", () => {
    const statement = parseCode(
      "for (const [idx, {id, item}] of array) { div() }"
    )
    const viewUnits = parseView(statement)
    const originalExpression = (
      (statement.body[0] as t.ForOfStatement).left as t.VariableDeclaration
    ).declarations[0].id
    const forUnit = viewUnits[0] as ForUnit
    expect(forUnit.item).toBe(originalExpression)
  })

  // ---- Array
  it("should correctly parse the array of a for-of statement", () => {
    const statement = parseCode("for (const item of array) { div() }")
    const viewUnits = parseView(statement)
    const originalExpression = (statement.body[0] as t.ForOfStatement)
      .right as t.Identifier
    const forUnit = viewUnits[0] as ForUnit
    expect(forUnit.array).toBe(originalExpression)
  })

  it("should correctly parse the array of a for-of statement with a complex expression", () => {
    const statement = parseCode(
      "for (const item of array.map(item => item.id)) { div() }"
    )
    const viewUnits = parseView(statement)
    const originalExpression = (statement.body[0] as t.ForOfStatement)
      .right as t.CallExpression
    const forUnit = viewUnits[0] as ForUnit
    expect(forUnit.array).toBe(originalExpression)
  })

  // ---- Key
  it("should correctly parse the key of a for-of statement", () => {
    const viewUnits = parse("for (const item of array) { key: item; div() }")
    const forUnit = viewUnits[0] as ForUnit
    expect(t.isIdentifier(forUnit.key, { name: "item" })).toBeTruthy()
  })

  it("should throw the error when key is not labeled by 'key: ' in a for-of statement", () => {
    const viewUnits = parse("for (const item of array) { fuck: item; div() }")
    const forUnit = viewUnits[0] as ForUnit
    expect(t.isNullLiteral(forUnit.key)).toBeTruthy()
  })

  it("should drop the key of a for-of statement if it's not an identifier", () => {
    const viewUnits = parse("for (const item of array) { div() }")
    const forUnit = viewUnits[0] as ForUnit
    expect(t.isNullLiteral(forUnit.key)).toBeTruthy()
  })

  // ---- Children
  it("should correctly parse the children of a for-of statement", () => {
    const viewUnits = parse("for (const item of array) { div() }")
    const forUnit = viewUnits[0] as ForUnit
    expect(forUnit.children.length).toBe(1)
    expect(forUnit.children[0].type).toBe("html")
  })

  it("should correctly parse the children of a for-of statement with multiple children", () => {
    const viewUnits = parse("for (const item of array) { div(); div() }")
    const forUnit = viewUnits[0] as ForUnit
    expect(forUnit.children.length).toBe(2)
    expect(forUnit.children[0].type).toBe("html")
    expect(forUnit.children[1].type).toBe("html")
  })

  it("should correctly parse the count of children of a for-of statement with multiple children", () => {
    const viewUnits = parse(
      "for (const item of array) { div(); div(); span(); { h1() } }"
    )
    const forUnit = viewUnits[0] as ForUnit
    expect(forUnit.children.length).toBe(3)
  })
})
