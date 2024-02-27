import { expect, describe, it } from "vitest"
import { parse, parseCode, parseView } from "./mock"
import { type ExpUnit, type HTMLUnit } from "../types"
import { types as t } from "@babel/core"

describe("ExpUnit", () => {
  // ---- Type
  it("should identify an expression as an ExpUnit", () => {
    const viewUnits = parse("this.flag")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("exp")
  })

  it("should identify an expression inside an _ function call as an ExpUnit", () => {
    const viewUnits = parse("_(this.flag)")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("exp")
  })

  it("should identify the tag of a tagged template literal as an ExpUnit", () => {
    const viewUnits = parse("i18n`Hello World`")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("exp")
  })

  // ---- Content
  it("should correctly parse content with any expression as its value", () => {
    const statement = parseCode("this.flag")
    const viewUnits = parseView(statement)
    const originalExpression = (statement.body[0] as t.ExpressionStatement)
      .expression

    const content = (viewUnits[0] as ExpUnit).content
    expect(content?.value).toBe(originalExpression)
  })

  it("should correctly parse content with any expression inside _ function call as its value", () => {
    const statement = parseCode("_(this.flag)")
    const viewUnits = parseView(statement)
    const originalExpression = (
      (statement.body[0] as t.ExpressionStatement)
        .expression as t.CallExpression
    ).arguments[0]

    const content = (viewUnits[0] as ExpUnit).content
    expect(content?.value).toBe(originalExpression)
  })

  it("should correctly parse the View => {} as view props", () => {
    const statement = parseCode("_(View => { div() })")
    const viewUnits = parseView(statement)

    const content = (viewUnits[0] as ExpUnit).content
    const viewPropMap = content.viewPropMap!
    expect(Object.keys(viewPropMap).length).toBe(1)

    const key = Object.keys(viewPropMap)[0]
    const viewProp = viewPropMap[key]
    const value = content.value

    // ---- Prop View will be replaced with a random string and stored in props.viewPropMap
    expect(t.isStringLiteral(value, { value: key })).toBeTruthy()

    expect(viewProp.length).toBe(1)
    expect(viewProp[0].type).toBe("html")
    expect(
      t.isStringLiteral((viewProp[0] as HTMLUnit).tag, { value: "div" })
    ).toBeTruthy()
  })

  // ---- Props
  it("should correctly parse chaining function as props", () => {
    const viewUnits = parse('_(this.flag).id("id").class("class")')
    const props = (viewUnits[0] as ExpUnit).props
    expect(props).toBeTruthy()

    expect(t.isStringLiteral(props?.id?.value, { value: "id" })).toBeTruthy()
    expect(
      t.isStringLiteral(props?.class?.value, { value: "class" })
    ).toBeTruthy()
  })

  it("should correctly parse props with any expression as their values", () => {
    const statement = parseCode(
      '_(this.flag).onclick(() => {console.log("hello")})'
    )
    const viewUnits = parseView(statement)
    const originalExpression = (
      (statement.body[0] as t.ExpressionStatement)
        .expression as t.CallExpression
    ).arguments[0]

    const props = (viewUnits[0] as ExpUnit).props!
    expect(props.onclick?.value).toBe(originalExpression)
  })

  it("should correctly parse the count of props", () => {
    const viewUnits = parse(
      '_(this.flag).id("id").class("class").style("style").onclick(() => {}).onmouseover(() => {})'
    )
    const props = (viewUnits[0] as ExpUnit).props!
    expect(Object.keys(props).length).toBe(5)
  })

  it("should correctly parse props with the View => {} as view units as ViewUnits stored in props.viewPropMap", () => {
    const statement = parseCode("_(this.flag).anyProp(View => { div() })")
    const viewUnits = parseView(statement)

    const props = (viewUnits[0] as ExpUnit).props!
    const viewPropMap = props.anyProp.viewPropMap!
    expect(Object.keys(viewPropMap).length).toBe(1)

    const key = Object.keys(viewPropMap)[0]
    const viewProp = viewPropMap[key]
    const value = props.anyProp.value

    // ---- Prop View will be replaced with a random string and stored in props.viewPropMap
    expect(t.isStringLiteral(value, { value: key })).toBeTruthy()

    expect(viewProp.length).toBe(1)
    expect(viewProp[0].type).toBe("html")
    expect(
      t.isStringLiteral((viewProp[0] as HTMLUnit).tag, { value: "div" })
    ).toBeTruthy()
  })

  // ---- Children
  it("should not have children", () => {
    const viewUnits = parse("this.flag; { div() }")
    expect(!("children" in viewUnits[0])).toBeTruthy()
  })
})
