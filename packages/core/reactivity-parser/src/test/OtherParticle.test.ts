import { expect, describe, it } from "vitest"
import { parse } from "./mock"
import { type ForParticle } from "../../dist"
import { type HTMLParticle } from "../types"

describe("OtherParticle", () => {
  it("should parse a TextUnit as a TextParticle", () => {
    const viewParticles = parse("\"Hello World\"")
    expect(viewParticles.length).toBe(1)
    expect(viewParticles[0].type).toBe("text")
  })

  it("should parse an IfUnit as an IfParticle", () => {
    const viewParticles = parse("if(this.flag) { div() }")
    expect(viewParticles.length).toBe(1)
    expect(viewParticles[0].type).toBe("if")
  })

  it("should parse a ForUnit as a ForParticle", () => {
    const viewParticles = parse("for(const item of this.items) { div() }")
    expect(viewParticles.length).toBe(1)
    expect(viewParticles[0].type).toBe("for")
  })

  it("should correctly parse ForUnit's item dependencies from array", () => {
    console.log("this")
    const viewParticles = parse("for(const item of this.array[this.count]) { div(item) }")
    expect(viewParticles.length).toBe(1)
    expect(viewParticles[0].type).toBe("for")

    const divParticle = (viewParticles[0] as ForParticle).children[0] as HTMLParticle
    const divDependency = divParticle.props?.textContent?.dependencyIndexArr
    expect(divDependency).toContain(0)
    expect(divDependency).toContain(1)
    expect(divDependency).toContain(3)
  })

  it("should correctly parse ForUnit's deconstruct item dependencies from array", () => {
    console.log("this")
    const viewParticles = parse("for(const { idx, item } of this.array[this.count]) { div(item) }")
    expect(viewParticles.length).toBe(1)
    expect(viewParticles[0].type).toBe("for")

    const divParticle = (viewParticles[0] as ForParticle).children[0] as HTMLParticle
    const divDependency = divParticle.props?.textContent?.dependencyIndexArr
    expect(divDependency).toContain(0)
    expect(divDependency).toContain(1)
    expect(divDependency).toContain(3)
  })

  it("should parse a EnvUnit as a EnvParticle", () => {
    const viewParticles = parse("env().count(2); { div() }")
    expect(viewParticles.length).toBe(1)
    expect(viewParticles[0].type).toBe("env")
  })

  it("should parse a ExpUnit as a ExpParticle", () => {
    const viewParticles = parse("this.flag")
    expect(viewParticles.length).toBe(1)
    expect(viewParticles[0].type).toBe("exp")
  })
})
