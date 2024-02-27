import { expect, describe, it } from "vitest"
import { parse, parseCode, parseView } from "./mock"
import { type HTMLUnit } from "../types"
import { types as t } from "@babel/core"

describe("HTMLUnit", () => {
  // ---- Type
  it("should identify a function call with identifier's name in htmlTags of config as an HTMLUnit", () => {
    const viewUnits = parse("div()")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("html")
  })

  it("should identify an expression inside tag function call as an HTMLUnit", () => {
    const viewUnits = parse(
      'tag(function IWillDoAnything(){return "div"}.call())()'
    )
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("html")
  })

  // ---- Tag
  it("should correctly parse the tag of an HTMLUnit of the type of function call", () => {
    const viewUnits = parse("div()")
    const tag = (viewUnits[0] as HTMLUnit).tag
    expect(t.isStringLiteral(tag, { value: "div" })).toBeTruthy()
  })

  it("should correctly parse the tag of an HTMLUnit of the type of any expression inside tag to be original expression", () => {
    const statement = parseCode(
      'tag(function IWillDoAnything(){return "div"}.call())()'
    )
    const viewUnits = parseView(statement)

    const originalExpression = (
      (
        (statement.body[0] as t.ExpressionStatement)
          .expression as t.CallExpression
      ).callee as t.CallExpression
    ).arguments[0]

    const tag = (viewUnits[0] as HTMLUnit).tag
    expect(tag).toBe(originalExpression)
  })

  // ---- Content
  it("should correctly parse content for HTMLTag", () => {
    const viewUnits = parse('div("hello")')
    const content = (viewUnits[0] as HTMLUnit).props.textContent

    expect(t.isStringLiteral(content?.value, { value: "hello" })).toBeTruthy()
  })

  it("should correctly parse content with any expression as its value", () => {
    const statement = parseCode("div(() => {doAnything()})")
    const viewUnits = parseView(statement)
    const originalExpression = (
      (statement.body[0] as t.ExpressionStatement)
        .expression as t.CallExpression
    ).arguments[0]

    const content = (viewUnits[0] as HTMLUnit).props.textContent
    expect(content?.value).toBe(originalExpression)
  })

  // ---- Props
  it("should correctly parse chaining function as props", () => {
    const viewUnits = parse('div().id("id").class("class")')
    const props = (viewUnits[0] as HTMLUnit).props
    expect(props).toBeTruthy()

    expect(t.isStringLiteral(props?.id?.value, { value: "id" })).toBeTruthy()
    expect(
      t.isStringLiteral(props?.class?.value, { value: "class" })
    ).toBeTruthy()
  })

  it("should correctly parse empty prop as true", () => {
    const viewUnits = parse("div().id()")
    const props = (viewUnits[0] as HTMLUnit).props
    expect(props).toBeTruthy()

    expect(t.isBooleanLiteral(props?.id?.value, { value: true })).toBeTruthy()
  })

  it("should correctly parse props with any expression as their values", () => {
    const statement = parseCode('div().onclick(() => {console.log("hello")})')
    const viewUnits = parseView(statement)
    const originalExpression = (
      (statement.body[0] as t.ExpressionStatement)
        .expression as t.CallExpression
    ).arguments[0]

    const props = (viewUnits[0] as HTMLUnit).props!
    expect(props.onclick?.value).toBe(originalExpression)
  })

  it("should correctly parse props for HTMLTag with htmlTag function call as its tag", () => {
    const viewUnits = parse(
      'htmlTag(function IWillDoAnything(){return "div"}.call()).id("id").class("class")'
    )
    const props = (viewUnits[0] as HTMLUnit).props!

    expect(t.isStringLiteral(props.id?.value, { value: "id" })).toBeTruthy()
    expect(
      t.isStringLiteral(props.class?.value, { value: "class" })
    ).toBeTruthy()
  })

  it("should parse props with correct count", () => {
    const viewUnits = parse(
      "div(0).id(1).class(2).style(3).onclick(4).onmouseover(5)"
    )

    // ---- Content stored in content instead of props
    const props = (viewUnits[0] as HTMLUnit).props!
    expect(Object.keys(props).length).toBe(6)
  })

  it("should parse the View => {} as props' nested view as ViewUnits stored in props.viewPropMap", () => {
    const statement = parseCode("div().anyProp(View => { span() })")
    const viewUnits = parseView(statement)

    const props = (viewUnits[0] as HTMLUnit).props!
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
      t.isStringLiteral((viewProp[0] as HTMLUnit).tag, { value: "span" })
    ).toBeTruthy()
  })

  // ---- Children
  it("should correctly parse children for HTMLTag", () => {
    const viewUnits = parse('div();{ h1("hello") }')
    const children = (viewUnits[0] as HTMLUnit).children!

    expect(children.length).toBe(1)
    expect(children[0].type).toBe("html")
    expect(
      t.isStringLiteral((children[0] as HTMLUnit).tag, { value: "h1" })
    ).toBeTruthy()
    expect(
      t.isStringLiteral((children[0] as HTMLUnit).props.textContent.value, {
        value: "hello",
      })
    ).toBeTruthy()
  })

  it("should parse children with correct count", () => {
    const viewUnits = parse('div();{ h1("1"); h2("2"); h3("3") }')
    const children = (viewUnits[0] as HTMLUnit).children!

    expect(children.length).toBe(3)
  })

  it("should parse nested children with correct count", () => {
    const viewUnits = parse(
      'div();{ h1("1"); { span(1); span(2) } h2("2"); h3("3") }'
    )
    const children = (viewUnits[0] as HTMLUnit).children!

    expect(children.length).toBe(3)
  })

  it("should drop content in HTMLTag if children exist", () => {
    const viewUnits = parse('div("hello");{ h1("hello") }')
    const content = (viewUnits[0] as HTMLUnit).props.textContent

    expect(content).toBeUndefined()
  })
})
