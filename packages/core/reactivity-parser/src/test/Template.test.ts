import { expect, describe, it } from "vitest"
import { parse } from "./mock"
import { type TemplateParticle } from "../types"

describe("TemplateUnit", () => {
  it("should not parse a single HTMLUnit to a TemplateUnit", () => {
    const viewParticles = parse("div()")
    expect(viewParticles.length).toBe(1)
    expect(viewParticles[0].type).not.toBe("template")
  })

  it("should parse a nested HTMLUnit to a TemplateUnit", () => {
    const viewParticles = parse("div(); {div()}")
    expect(viewParticles.length).toBe(1)
    expect(viewParticles[0].type).toBe("template")
  })

  it("should correctly parse a nested HTMLUnit's structure into a template string", () => {
    const viewParticles = parse("div(); {div()}")
    const template = (viewParticles[0] as any).template
    expect(template).toBe("<div><div></div></div>")
  })

  it("should correctly parse a nested HTMLUnit's structure into a template string with props", () => {
    const viewParticles = parse("div().class(\"ok\"); {div()}")
    const template = (viewParticles[0] as any).template
    expect(template).toBe("<div class=\"ok\"><div></div></div>")
  })

  it("should correctly parse the path of TemplateParticle's dynamic props in root element", () => {
    const viewParticles = parse("div().class(this.flag); {div()}")
    const template = (viewParticles[0] as TemplateParticle).template
    expect(template).toBe("<div><div></div></div>")

    const dynamicProps = (viewParticles[0] as TemplateParticle).props
    expect(dynamicProps).toHaveLength(1)
    const prop = dynamicProps[0]
    // ---- Path will be [] because it's the root element
    expect(prop.path).toHaveLength(0)
  })

  it("should correctly parse the path of TemplateParticle's dynamic props in nested element", () => {
    const viewParticles = parse("div(); {div().class(this.flag)}")
    const template = (viewParticles[0] as TemplateParticle).template
    expect(template).toBe("<div><div></div></div>")

    const dynamicProps = (viewParticles[0] as TemplateParticle).props
    expect(dynamicProps).toHaveLength(1)
    const prop = dynamicProps[0]
    // ---- Path will be [0] because it's the first child of the root element
    expect(prop.path).toHaveLength(1)
    expect(prop.path[0]).toBe(0)
  })

  it("should correctly parse the path of TemplateParticle's mutableParticles", () => {
    const viewParticles = parse("div(); {div(); Comp(); div();}")
    const mutableParticles = (viewParticles[0] as TemplateParticle).mutableParticles
    expect(mutableParticles).toHaveLength(1)

    const mutableParticle = mutableParticles[0]
    expect(mutableParticle.path).toHaveLength(1)
    expect(mutableParticle.path[0]).toBe(1)
  })
})
