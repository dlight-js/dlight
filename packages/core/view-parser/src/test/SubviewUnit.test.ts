import { expect, describe, it } from "vitest"
import { parse, parseCode, parseView } from "./mock"
import { type SubviewUnit, type HTMLUnit } from "../types"
import { types as t } from "@babel/core"

describe("SubviewUnit", () => {
  // ---- Type
  it("should identify a this expression function call with identifier's name in subviewNames of config as an SubviewUnit", () => {
    const viewUnits = parse("this.MySubview()")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("subview")
  })

  it("should not identify a this expression function call with identifier's name not in subviewNames of config as an SubviewUnit", () => {
    const viewUnits = parse("this.MySubviewNotInConfig()")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).not.toBe("subview")
  })

  it("should identify an expression inside subview function call as an SubviewUnit", () => {
    const viewUnits = parse("subview(function IWillDoAnything(){return \"MySubview\"}.call())()")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("subview")
  })

  // ---- Tag
  it("should correctly parse the tag of an SubviewUnit of the type of function call", () => {
    const statement = parseCode("this.MySubview()")
    const viewUnits = parseView(statement)
    const originalExpression = ((statement.body[0] as t.ExpressionStatement).expression as t.CallExpression).callee
    const tag = (viewUnits[0] as HTMLUnit).tag

    expect(tag).toBe(originalExpression)
  })

  it("should correctly parse the tag of an SubviewUnit of the type of any expression inside subview function call to be original expression", () => {
    const statement = parseCode("subview(function IWillDoAnything(){return \"MySubview\"}.call())()")
    const viewUnits = parseView(statement)

    const originalExpression = (((statement.body[0] as t.ExpressionStatement)
      .expression as t.CallExpression).callee as t.CallExpression).arguments[0]

    const tag = (viewUnits[0] as HTMLUnit).tag
    expect(tag).toBe(originalExpression)
  })

  // ---- Props
  it("should correctly parse content for SubviewTag", () => {
    const viewUnits = parse("this.MySubview(\"hello\")")
    const content = (viewUnits[0] as SubviewUnit).props?.content

    expect(t.isStringLiteral(content?.value, { value: "hello" })).toBeTruthy()
  })

  it("should correctly parse props for SubviewTag", () => {
    const viewUnits = parse("this.MySubview().id(\"id\").class(\"class\")")
    const props = (viewUnits[0] as SubviewUnit).props
    expect(t.isStringLiteral(props?.id.value, { value: "id" })).toBeTruthy()
    expect(t.isStringLiteral(props?.class.value, { value: "class" })).toBeTruthy()
  })

  it("should correctly parse props with any expression as its value", () => {
    const statement = parseCode("this.MySubview(() => {doAnything()})")
    const viewUnits = parseView(statement)
    const originalExpression = ((statement.body[0] as t.ExpressionStatement).expression as t.CallExpression).arguments[0]

    const content = (viewUnits[0] as SubviewUnit).props?.content
    expect(content?.value).toBe(originalExpression)
  })

  it("should correctly parse props with the View => {} as view units as its value", () => {
    const statement = parseCode("this.MySubview(View => { div() })")
    const viewUnits = parseView(statement)

    const props = (viewUnits[0] as SubviewUnit).props!
    const viewPropMap = props.content.viewPropMap!
    expect(Object.keys(viewPropMap).length).toBe(1)

    const key = Object.keys(viewPropMap)[0]
    const viewProp = viewPropMap[key]
    const value = props?.content.value

    // ---- Prop View will be replaced with a random string and stored in props.viewPropMap
    expect(t.isStringLiteral(value, { value: key })).toBeTruthy()

    expect(viewProp.length).toBe(1)
    expect(viewProp[0].type).toBe("html")
    expect(t.isStringLiteral((viewProp[0] as HTMLUnit).tag, { value: "div" })).toBeTruthy()
  })

  // ---- Children
  it("should correctly parse the children of an SubviewUnit", () => {
    const viewUnits = parse("this.MySubview(); { div() }")

    const subviewUnit = viewUnits[0] as SubviewUnit
    expect(subviewUnit.children?.length).toBe(1)
    expect(subviewUnit.children?.[0].type).toBe("html")
  })

  it("should correctly parse the children of an SubviewUnit with multiple children", () => {
    const viewUnits = parse("this.MySubview(); { div(); div() }")

    const subviewUnit = viewUnits[0] as SubviewUnit
    expect(subviewUnit.children?.length).toBe(2)
    expect(subviewUnit.children?.[0].type).toBe("html")
    expect(subviewUnit.children?.[1].type).toBe("html")
  })

  it("should correctly parse the count of children of an SubviewUnit with multiple children", () => {
    const viewUnits = parse("this.MySubview(); { div(); div(); h1(); h2(); h3() }")

    const subviewUnit = viewUnits[0] as SubviewUnit
    expect(subviewUnit.children?.length).toBe(5)
  })
})
