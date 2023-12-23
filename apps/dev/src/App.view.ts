// @ts-ignore
import { Children, Content, Prop, View, required } from "@dlightjs/dlight"
import { type Typed, type Pretty, button, p, span } from "@dlightjs/types"

@View
class Sub {
  @Prop name
  @Prop onClick

  View() {
    button(this.name)
      .onClick(this.onClick)
  }
}

@ForwardProp
@View
class Ok {
  View() {
    button("ok")
      .forwardProps()
    Sub()
      .forwardProps()
  }
}

@View
class App {
  count = 0
  arr = [0, 1]

  View() {
    button("+").onclick(() => {
      this.count++
    })
    Ok()
      .style({
        color: "red"
      })
      .onClick(() => {
        console.log(this.count)
      })
        .name("shit")

    // Ok()
    //   .ok(View => {
    //     div(this.count)
    //   })
    //   if (this.count > 0) {
    //     div(this.count)
    //   }
  }
}

export default App as Pretty as Typed
