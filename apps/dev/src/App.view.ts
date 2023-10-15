import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty, div, button, type SubTyped, h1 } from "@dlightjs/types"

import transform from "@dlightjs/transpiler-standalone"

@View
class App {
  a = 1
  b = (() => {
    console.log("b changed", this.a)
    return this.a
  })()

  c = (() => {
    console.log("c changed", this.a)
    return this.b
  })()

  d = (() => {
    console.log("d changed", this.b + this.c)
    return this.b + this.c
  })()

  Body() {
    div(this.d)
    button("+")
      .onclick(() => {
        this.a++
      })
  }
}

export default App as Pretty as Typed
