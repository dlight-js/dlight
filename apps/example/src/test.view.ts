// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View } from "@dlightjs/dlight"
import { button, div, SubView, required } from "@dlightjs/types"
import { HStack } from "@dlightjs/components"
import { escape, $ } from "@dlightjs/dlight"
import { manual } from "@dlightjs/dlight"

class BBB extends View {
  @Prop aa = required

  Body() {
    div(this.aa.a)
  }
}

class AAA extends View {
  @Prop aa = required
  a = 1
  b = (() => {
    this.aa = { a: this.a }
  })()

  Body() {
    div(this.aa.a)
    button()
      .onclick(() => {
        this.a++
      })
  }
}

class TestView extends View {
  a = { a: 110 }
  Body() {
    AAA()
      .aa(this.a)
    BBB()
      .aa({ a: 100 })
  }
}

export default TestView
