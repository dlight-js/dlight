import { describe, expect, it } from "vitest"
import { parse, parseCode, parseView } from "./mock"
import { types as t } from "@babel/core"
import { type TextUnit } from "../index"

describe("TextUnit", () => {
  // ---- Type
  it("should identify a string literal as a TextUnit", () => {
    // ---- Add a html unit to make it a string literal instead of a directive
    const viewUnits = parse('div();"Hello World"')
    expect(viewUnits.length).toBe(2)
    expect(viewUnits[1].type).toBe("text")
  })

  it("should identify a template literal as a TextUnit", () => {
    const viewUnits = parse("`Hello World`")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("text")
  })

  it("should identify a directive as a TextUnit", () => {
    const statement = parseCode('"Hello World"')
    expect(statement.body.length).toBe(0)
    expect(statement.directives.length).toBe(1)

    const viewUnits = parseView(statement)
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("text")
  })

  it("should identify a tagged template literal with a string literal as its tag as two TextUnits", () => {
    const viewUnits = parse('"hi"`Hello World`')
    expect(viewUnits.length).toBe(2)

    expect(viewUnits[0].type).toBe("text")
    expect(viewUnits[1].type).toBe("text")

    const content1 = (viewUnits[0] as TextUnit).content
    expect(t.isStringLiteral(content1, { value: "hi" })).toBeTruthy()

    const content2 = (viewUnits[1] as TextUnit).content
    expect(t.isTemplateLiteral(content2)).toBeTruthy()
    const content2Quasis = (content2 as t.TemplateLiteral).quasis[0]
    expect(t.isTemplateElement(content2Quasis)).toBeTruthy()
    const content2Value = content2Quasis.value
    expect(content2Value.raw).toBe("Hello World")
  })

  it("should identify a tagged template literal with a template literal as its tag as two TextUnits", () => {
    const viewUnits = parse("`hi``Hello World`")
    expect(viewUnits.length).toBe(2)
    expect(viewUnits[0].type).toBe("text")
    expect(viewUnits[1].type).toBe("text")

    const content1 = (viewUnits[0] as TextUnit).content
    expect(t.isTemplateLiteral(content1)).toBeTruthy()
    const content1Quasis = (content1 as t.TemplateLiteral).quasis[0]
    expect(t.isTemplateElement(content1Quasis)).toBeTruthy()
    const content1Value = content1Quasis.value
    expect(content1Value.raw).toBe("hi")

    const content2 = (viewUnits[1] as TextUnit).content
    expect(t.isTemplateLiteral(content2)).toBeTruthy()
    const content2Quasis = (content2 as t.TemplateLiteral).quasis[0]
    expect(t.isTemplateElement(content2Quasis)).toBeTruthy()
    const content2Value = content2Quasis.value
    expect(content2Value.raw).toBe("Hello World")
  })

  // ---- Content
  it("should correctly parse a string literal as its content", () => {
    const viewUnits = parse('"Hello World"')
    const content = (viewUnits[0] as TextUnit).content
    expect(t.isStringLiteral(content, { value: "Hello World" })).toBeTruthy()
  })

  it("should save the original node as its content for a template literal", () => {
    // eslint-disable-next-line no-template-curly-in-string
    const statement = parseCode("`Hello World ${name}`")
    const viewUnits = parseView(statement)
    const originalNode = (statement.body[0] as t.ExpressionStatement).expression

    const content = (viewUnits[0] as TextUnit).content
    expect(content).toBe(originalNode)
  })
})
