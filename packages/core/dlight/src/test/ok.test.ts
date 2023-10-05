import { describe, expect, it } from "vitest"

describe("hello", () => {
  it("should say hello", () => "hello")
  it("hi", () => {
    expect("ok").equals("ok")
  })
})
