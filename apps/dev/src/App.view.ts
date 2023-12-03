// @ts-ignore
import { Children, Content, Prop, View, required } from "@dlightjs/dlight"
import { type Typed, type Pretty, div, button, p, span } from "@dlightjs/types"

@View
class Comp {
  @Prop message = "shit"

  Body() {
    div()
    {
      div(this.message)
    }
  }
}
const CompView = Comp as Pretty as Typed

@View
class Comp2 {
  message = "Hello"

  Body() {
    CompView()
      .message(this.message)
  }
}
const CompView2 = Comp2 as Pretty as Typed

@View
class Comp3 {
  Body() {
    CompView2()
  }
}
const CompView3 = Comp3 as Pretty as Typed

@View
class App {
  count = 1
  toggle = false
  Body() {
    div(this.count)
    button("+")
      .onclick(() => {
        this.count++
      })
    button("toggle")
      .onclick(() => {
        this.toggle = !this.toggle
      })
    if (this.toggle) {
      CompView()
    } else {
      CompView3()
    }
  }
}

export default App as Pretty as Typed

@View
class Span {
  @Prop if = required
  @Prop @Content content = required
  Body() {
    if (this.if) {
      this.content
    }
  }
}

@View
class MyComp {
  light = "red"
  Body() {
    button("Next light")
    p(`Light is: ${this.light}`)
    p()
    {
      "You must"
      Span("STOP")
        .if(this.light === "red")
      Span("SLOW DOWN")
        .if(this.light === "orange")
      Span("GO")
        .if(this.light === "greed")
    }
  }
}
