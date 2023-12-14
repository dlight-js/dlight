import { expect, describe, it } from "vitest"
import { parse, parseCode, parseView } from "./mock"
import { type HTMLUnit } from "../types"
import { types as t } from "@babel/core"

describe("CompUnit", () => {
  // ---- Type
  it("should identify a function call with identifier's name not in htmlTags of config as an CompUnit", () => {
    const viewUnits = parse("Comp()")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("comp")
  })

  it("should identify an expression inside tag function call as an CompUnit", () => {
    const viewUnits = parse("comp(function IWillDoAnything(){return \"Comp\"}.call())()")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("comp")
  })

  // ---- Tag
  it("should correctly parse the tag of an CompUnit of the type of function call", () => {
    const viewUnits = parse("Comp()")
    const tag = (viewUnits[0] as HTMLUnit).tag
    expect(t.isIdentifier(tag, { name: "Comp" })).toBeTruthy()
  })

  it("should correctly parse a member expression function call as an CompUnit", () => {
    const statement = parseCode("CompList[0].MyComp.Component()")
    const viewUnits = parseView(statement)
    const originalExpression = ((statement.body[0] as t.ExpressionStatement).expression as t.CallExpression).callee
    const tag = (viewUnits[0] as HTMLUnit).tag

    expect(tag).toBe(originalExpression)
  })

  it("should correctly parse the tag of an CompUnit of the type of any expression inside tag to be original expression", () => {
    const statement = parseCode("comp(function IWillDoAnything(){return \"Comp\"}.call())()")
    const viewUnits = parseView(statement)

    const originalExpression = (((statement.body[0] as t.ExpressionStatement)
      .expression as t.CallExpression).callee as t.CallExpression).arguments[0]

    const tag = (viewUnits[0] as HTMLUnit).tag
    expect(tag).toBe(originalExpression)
  })

  // ---- Content
  it("should correctly parse content for CompTag", () => {
    const viewUnits = parse("Comp(\"hello\")")
    const content = (viewUnits[0] as HTMLUnit).content

    expect(t.isStringLiteral(content?.value, { value: "hello" })).toBeTruthy()
  })

  it("should correctly parse content with any expression as its value", () => {
    const statement = parseCode("Comp(() => {doAnything()})")
    const viewUnits = parseView(statement)
    const originalExpression = ((statement.body[0] as t.ExpressionStatement).expression as t.CallExpression).arguments[0]

    const content = (viewUnits[0] as HTMLUnit).content?.value
    expect(content).toBe(originalExpression)
  })

  it("should correctly parse content with do expression as view units as its value", () => {
    const statement = parseCode("Comp(do { div(); span() })")
    const viewUnits = parseView(statement)

    const content = (viewUnits[0] as HTMLUnit).content!
    const viewContentMap = content.viewPropMap!
    expect(Object.keys(viewContentMap).length).toBe(1)

    const key = Object.keys(viewContentMap)[0]
    const viewProp = viewContentMap[key]
    const value = content.value

    // ---- Prop View will be replaced with a random string and stored in props.viewPropMap
    expect(t.isStringLiteral(value, { value: key })).toBeTruthy()

    expect(viewProp.length).toBe(2)
    expect(viewProp[0].type).toBe("html")
    expect(t.isStringLiteral((viewProp[0] as HTMLUnit).tag, { value: "div" })).toBeTruthy()
    expect(viewProp[1].type).toBe("html")
    expect(t.isStringLiteral((viewProp[1] as HTMLUnit).tag, { value: "span" })).toBeTruthy()
  })

  // ---- Props
  it("should correctly parse chaining function as props", () => {
    const viewUnits = parse("Comp().count(1).message(\"hello\")")
    const props = (viewUnits[0] as HTMLUnit).props
    expect(props).toBeTruthy()

    expect(t.isNumericLiteral(props?.count?.value, { value: 1 })).toBeTruthy()
    expect(t.isStringLiteral(props?.message?.value, { value: "hello" })).toBeTruthy()
  })

  it("should correctly parse props with any expression as their values", () => {
    const statement = parseCode("Comp().onclick(() => {console.log(\"hello\")})")
    const viewUnits = parseView(statement)
    const originalExpression = ((statement.body[0] as t.ExpressionStatement).expression as t.CallExpression).arguments[0]

    const props = (viewUnits[0] as HTMLUnit).props!
    expect(props.onclick?.value).toBe(originalExpression)
  })

  it("should correctly parse the count of props", () => {
    const viewUnits = parse("Comp().count(1).message(\"hello\").go1(1).go2(2).go3(3)")
    const props = (viewUnits[0] as HTMLUnit).props!
    expect(Object.keys(props).length).toBe(5)
  })

  it("should correctly parse props with do expression as their values", () => {
    const statement = parseCode("Comp().internalComp(do { div() })")
    const viewUnits = parseView(statement)
    const props = (viewUnits[0] as HTMLUnit).props!
    const viewPropMap = props.internalComp.viewPropMap!
    expect(Object.keys(viewPropMap).length).toBe(1)

    const key = Object.keys(viewPropMap)[0]
    const viewProp = viewPropMap[key]
    const value = props.internalComp.value

    // ---- Prop View will be replaced with a random string and stored in props.viewPropMap
    expect(t.isStringLiteral(value, { value: key })).toBeTruthy()

    expect(viewProp.length).toBe(1)
    expect(viewProp[0].type).toBe("html")
    expect(t.isStringLiteral((viewProp[0] as HTMLUnit).tag, { value: "div" })).toBeTruthy()
  })

  // ---- Children
  it("should correctly parse children for CompTag", () => {
    const viewUnits = parse("Comp(); { div() }")
    const children = (viewUnits[0] as HTMLUnit).children

    expect(children?.length).toBe(1)
    expect(children?.[0].type).toBe("html")
    expect(t.isStringLiteral((children?.[0] as HTMLUnit).tag, { value: "div" })).toBeTruthy()
  })

  it("should correctly parse multiple children", () => {
    const viewUnits = parse("Comp(); { div(); span() }")
    const children = (viewUnits[0] as HTMLUnit).children

    expect(children?.length).toBe(2)
    expect(children?.[0].type).toBe("html")
    expect(t.isStringLiteral((children?.[0] as HTMLUnit).tag, { value: "div" })).toBeTruthy()
    expect(children?.[1].type).toBe("html")
    expect(t.isStringLiteral((children?.[1] as HTMLUnit).tag, { value: "span" })).toBeTruthy()
  })

  it("should correctly parse the count of children", () => {
    const viewUnits = parse("Comp(); { div(); span(); h1(); { h2() }; h3()}")
    const children = (viewUnits[0] as HTMLUnit).children

    expect(children?.length).toBe(4)
  })
})
