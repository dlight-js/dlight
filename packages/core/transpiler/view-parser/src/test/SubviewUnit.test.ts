import { expect, describe, it } from "vitest"
import { parse, parseCode, parseView } from "./mock"
import { type SnippetUnit, type HTMLUnit } from "../types"
import { types as t } from "@babel/core"

describe("SnippetUnit", () => {
  // ---- Type
  it("should identify a this expression function call with identifier's name in snippetNames of config as an SnippetUnit", () => {
    const viewUnits = parse("this.MySnippet()")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("snippet")
  })

  it("should not identify a this expression function call with identifier's name not in snippetNames of config as an SnippetUnit", () => {
    const viewUnits = parse("this.MySnippetNotInConfig()")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).not.toBe("snippet")
  })

  // ---- Tag
  it("should correctly parse the tag of an SnippetUnit of the type of function call", () => {
    const viewUnits = parse("this.MySnippet()")
    const tag = (viewUnits[0] as HTMLUnit).tag

    expect(tag).toBe("MySnippet")
  })

  // ---- Props
  it("should correctly parse content for SnippetTag", () => {
    const viewUnits = parse('this.MySnippet("hello")')
    const content = (viewUnits[0] as SnippetUnit).props?.content

    expect(t.isStringLiteral(content?.value, { value: "hello" })).toBeTruthy()
  })

  it("should correctly parse props for SnippetTag", () => {
    const viewUnits = parse('this.MySnippet().id("id").class("class")')
    const props = (viewUnits[0] as SnippetUnit).props
    expect(t.isStringLiteral(props?.id.value, { value: "id" })).toBeTruthy()
    expect(
      t.isStringLiteral(props?.class.value, { value: "class" })
    ).toBeTruthy()
  })

  it("should correctly parse props with any expression as its value", () => {
    const statement = parseCode("this.MySnippet(() => {doAnything()})")
    const viewUnits = parseView(statement)
    const originalExpression = (
      (statement.body[0] as t.ExpressionStatement)
        .expression as t.CallExpression
    ).arguments[0]

    const content = (viewUnits[0] as SnippetUnit).props?.content
    expect(content?.value).toBe(originalExpression)
  })

  it("should correctly parse props with the View => {} as view units as its value", () => {
    const statement = parseCode("this.MySnippet(View => { div() })")
    const viewUnits = parseView(statement)

    const props = (viewUnits[0] as SnippetUnit).props!
    const viewPropMap = props.content.viewPropMap!
    expect(Object.keys(viewPropMap).length).toBe(1)

    const key = Object.keys(viewPropMap)[0]
    const viewProp = viewPropMap[key]
    const value = props?.content.value

    // ---- Prop View will be replaced with a random string and stored in props.viewPropMap
    expect(t.isStringLiteral(value, { value: key })).toBeTruthy()

    expect(viewProp.length).toBe(1)
    expect(viewProp[0].type).toBe("html")
    expect(
      t.isStringLiteral((viewProp[0] as HTMLUnit).tag, { value: "div" })
    ).toBeTruthy()
  })

  // ---- Children
  it("should correctly parse the children of an SnippetUnit", () => {
    const viewUnits = parse("this.MySnippet(); { div() }")

    const snippetUnit = viewUnits[0] as SnippetUnit
    expect(snippetUnit.children?.length).toBe(1)
    expect(snippetUnit.children?.[0].type).toBe("html")
  })

  it("should correctly parse the children of an SnippetUnit with multiple children", () => {
    const viewUnits = parse("this.MySnippet(); { div(); div() }")

    const snippetUnit = viewUnits[0] as SnippetUnit
    expect(snippetUnit.children?.length).toBe(2)
    expect(snippetUnit.children?.[0].type).toBe("html")
    expect(snippetUnit.children?.[1].type).toBe("html")
  })

  it("should correctly parse the count of children of an SnippetUnit with multiple children", () => {
    const viewUnits = parse(
      "this.MySnippet(); { div(); div(); h1(); h2(); h3() }"
    )

    const snippetUnit = viewUnits[0] as SnippetUnit
    expect(snippetUnit.children?.length).toBe(5)
  })
})
