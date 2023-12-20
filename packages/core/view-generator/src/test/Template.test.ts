import { describe, it } from "vitest"
import { expectBlock, expectCompare, parse } from "./mock"

describe("Template", () => {
  it("should generate a template as a class property and a node calling function", () => {
    const [blockStatement, classProperties] = parse("div(); { div() }")

    expectBlock(blockStatement, `
      const node0 = MyComp.template0()
      
      return [node0]
    `)

    expectCompare(classProperties[0].value!, "createTemplate(\"<div><div></div></div>\")")
  })

  // ---- Props
  it("should generate a template with string props", () => {
    const [blockStatement, classProperties] = parse("div().class(\"ok\"); { div() }")

    expectBlock(blockStatement, `
      const node0 = MyComp.template0()
      
      return [node0]
    `)

    expectCompare(classProperties[0].value!, "createTemplate(\"<div class=\\\"ok\\\"><div></div></div>\")")
  })

  it("should generate a template with non-string props", () => {
    const [blockStatement, classProperties] = parse("div().onClick(() => {console.log(\"hello\")}); { div() }")

    expectBlock(blockStatement, `
      const node0 = MyComp.template0()
      node0.addEventListener("click", () => {console.log("hello")})
      
      return [node0]
    `)

    expectCompare(classProperties[0].value!, "createTemplate(\"<div><div></div></div>\")")
  })

  it("should generate a template with children's non-string props", () => {
    const [blockStatement, classProperties] = parse("div(); { div().onClick(() => {console.log(\"hello\")}) }")

    expectBlock(blockStatement, `
      const node0 = MyComp.template0()
      const node1 = getChildElementByPath(node0, 0)
      node1.addEventListener("click", () => {console.log("hello")})
      
      return [node0]
    `)

    expectCompare(classProperties[0].value!, "createTemplate(\"<div><div></div></div>\")")
  })

  // ---- MutableNodes
  it("should generate a template with MutableNodes", () => {
    const [blockStatement] = parse("div(); { div(); MyComp() }")

    expectBlock(blockStatement, `
      const node0 = MyComp.template0()
      const node1 = new MyComp()
      insertNode(node0, node1, 1)
      
      return [node0]
    `)
  })

  it("should generate a template with deeper MutableNodes", () => {
    const [blockStatement] = parse("div(); { div(); { div(); { MyComp() } } }")

    expectBlock(blockStatement, `
      const node0 = MyComp.template0()
      const node1 = getChildElementByPath(node0, 0, 0);
      const node2 = new MyComp();
      insertNode(node1, node2, 0);

      return [node0]
    `)
  })
})
