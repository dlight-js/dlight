import { describe, expect, it } from "vitest"
import { parse } from "./mock"
import { TryUnit } from "../types"
import { types as t } from "@babel/core"

describe("TryUnit", () => {
  it("should identify a try-catch statement as an TryUnit", () => {
    const viewUnits = parse("try { } catch (e) { }")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("try")
  })

  it("should identify a try-catch statement with statements inside", () => {
    const viewUnits = parse('try { div("hello") } catch (e) { }') as TryUnit[]
    expect(viewUnits[0].type).toBe("try")

    const child = viewUnits[0].children[0]
    expect(child.type).toBe("html")
  })

  it("should identify a try-catch statement with catch", () => {
    const viewUnits = parse("try { } catch (e) { div() }")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("try")
    expect((viewUnits[0] as TryUnit).catchChildren[0].type).toBe("html")
  })

  it("should identify a try-catch statement's catch with exception", () => {
    const viewUnits = parse("try { } catch (e) { div(e) }")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("try")
    const exception = (viewUnits[0] as TryUnit).exception
    expect(t.isIdentifier(exception, { name: "e" })).toBeTruthy()
  })

  it("should identify a try-catch statement with no exception", () => {
    const viewUnits = parse("try { } catch { div() }")
    expect(viewUnits.length).toBe(1)
    expect(viewUnits[0].type).toBe("try")
    const exception = (viewUnits[0] as TryUnit).exception
    expect(exception).toBe(null)
  })
})
