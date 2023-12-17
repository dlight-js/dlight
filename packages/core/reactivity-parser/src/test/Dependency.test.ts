import { expect, describe, it } from "vitest"
import { availableProperties, parse } from "./mock"
import { type CompParticle } from "../types"

describe("Dependency", () => {
  it("should parse the correct dependency", () => {
    const viewParticles = parse("Comp(this.flag)")
    const content = (viewParticles[0] as CompParticle).content
    expect(content?.dependencyIndexArr).toContain(0)
  })

  it("should parse the correct dependency when interfacing the dependency chain", () => {
    const viewParticles = parse("Comp(this.doubleCount)")
    const content = (viewParticles[0] as CompParticle).content
    const dependency = content?.dependencyIndexArr
    // ---- doubleCount depends on count, count depends on flag
    //      so doubleCount depends on flag, count and doubleCount
    expect(dependency).toContain(availableProperties.indexOf("flag"))
    expect(dependency).toContain(availableProperties.indexOf("count"))
    expect(dependency).toContain(availableProperties.indexOf("doubleCount"))
  })

  it("should not parse the dependency if the property is not in the availableProperties", () => {
    const viewParticles = parse("Comp(this.notExist)")
    const content = (viewParticles[0] as CompParticle).content
    expect(content?.dependencyIndexArr).toHaveLength(0)
  })

  it("should not parse the dependency if the identifier is not an property of a ThisExpression", () => {
    const viewParticles = parse("Comp(count)")
    const content = (viewParticles[0] as CompParticle).content
    expect(content?.dependencyIndexArr).toHaveLength(0)
  })

  it("should not parse the dependency if the member expression is in an escaped function", () => {
    let viewParticles = parse("Comp(escape(this.flag))")
    let content = (viewParticles[0] as CompParticle).content
    expect(content?.dependencyIndexArr).toHaveLength(0)

    viewParticles = parse("Comp($(this.flag))")
    content = (viewParticles[0] as CompParticle).content
    expect(content?.dependencyIndexArr).toHaveLength(0)
  })

  it("should not parse the dependency if the member expression is in a manual function", () => {
    const viewParticles = parse("Comp(manual(() => this.count, []))")
    const content = (viewParticles[0] as CompParticle).content
    expect(content?.dependencyIndexArr).toHaveLength(0)
  })

  it("should parse the dependencies in manual function's second parameter", () => {
    const viewParticles = parse("Comp(manual(() => {let a = this.count}, [this.flag]))")
    const content = (viewParticles[0] as CompParticle).content
    expect(content?.dependencyIndexArr).toHaveLength(1)
  })

  it("should not parse the dependency if the member expression is the left side of an assignment expression", () => {
    const viewParticles = parse("Comp(this.flag = 1)")
    const content = (viewParticles[0] as CompParticle).content
    expect(content?.dependencyIndexArr).toHaveLength(0)
  })

  it("should not parse the dependency if the member expression is right side of an assignment expression", () => {
    const viewParticles = parse("Comp(this.flag = this.flag + 1)")
    const content = (viewParticles[0] as CompParticle).content
    expect(content?.dependencyIndexArr).toHaveLength(0)
  })

  it("should not collect the dependency if the member expression is in a function", () => {
    const viewParticles = parse("Comp(() => this.flag)")
    const content = (viewParticles[0] as CompParticle).content
    expect(content?.dependencyIndexArr).toHaveLength(0)
  })
})
