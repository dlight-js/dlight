import { expect, describe, it } from "vitest"
import { parse, parseCode, parseView } from "./mock"
import { type HTMLUnit, type EnvUnit } from "../types"
import { types as t } from "@babel/core"

describe("EnvUnit", () => {
  // ---- Type
  it("should identify an env statement as an EnvUnit", () => {
    const viewUnits = parse("env().prop(1); { div() }")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("env")
  })

  it("should identify an env statement as an EnvUnit and ignore other statements", () => {
    const viewUnits = parse("env().prop(1); { div() }; div(text)")
    expect(viewUnits.length).toBe(2)
    expect(viewUnits[0].type).toBe("env")
  })

  it("should skip an env statement if the block statement is empty", () => {
    const viewUnits = parse("env().prop(1)")
    expect(viewUnits.length).toBe(0)
  })

  // ---- Props
  it("should correctly parse the props of an env statement", () => {
    const viewUnits = parse("env().count(2); { div() }")

    const envUnit = viewUnits[0] as EnvUnit
    expect(
      t.isNumericLiteral(envUnit.props.count.value, { value: 2 })
    ).toBeTruthy()
  })

  it("should correctly parse the props of an env statement with a complex expression", () => {
    const statement = parseCode("env().count(2 + 2); { div() }")
    const viewUnits = parseView(statement)
    const originalExpression = (
      (statement.body[0] as t.ExpressionStatement)
        .expression as t.CallExpression
    ).arguments[0]

    const envUnit = viewUnits[0] as EnvUnit
    expect(envUnit.props.count.value).toBe(originalExpression)
  })

  it("should correctly parse the View => {} as view props", () => {
    const statement = parseCode("env().comp(View => { div() }); { div() }")
    const viewUnits = parseView(statement)

    const props = (viewUnits[0] as EnvUnit).props
    const viewPropMap = props.comp.viewPropMap!
    expect(Object.keys(viewPropMap).length).toBe(1)

    const key = Object.keys(viewPropMap)[0]
    const viewProp = viewPropMap[key]
    const value = props.comp.value

    // ---- Prop View will be replaced with a random string and stored in props.viewPropMap
    expect(t.isStringLiteral(value, { value: key })).toBeTruthy()

    expect(viewProp.length).toBe(1)
    expect(viewProp[0].type).toBe("html")
    expect(
      t.isStringLiteral((viewProp[0] as HTMLUnit).tag, { value: "div" })
    ).toBeTruthy()
  })

  it("should be skipped if there's no props", () => {
    const viewUnits = parse("env(); { div() }")
    expect(viewUnits.length).toBe(0)
  })

  // ---- Children
  it("should correctly parse the children of an env statement", () => {
    const viewUnits = parse("env().prop(1); { div() }")

    const envUnit = viewUnits[0] as EnvUnit
    expect(envUnit.children.length).toBe(1)
    expect(envUnit.children[0].type).toBe("html")
  })

  it("should correctly parse the children of an env statement with multiple children", () => {
    const viewUnits = parse("env().prop(1); { div(); div() }")

    const envUnit = viewUnits[0] as EnvUnit
    expect(envUnit.children.length).toBe(2)
    expect(envUnit.children[0].type).toBe("html")
    expect(envUnit.children[1].type).toBe("html")
  })

  it("should correctly parse the count of children of an env statement with multiple children", () => {
    const viewUnits = parse(
      "env().prop(1); { div(); div(); h1(); { h1() }; h2(); h3() }"
    )

    const envUnit = viewUnits[0] as EnvUnit
    expect(envUnit.children.length).toBe(5)
  })
})
