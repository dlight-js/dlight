// @ts-ignore
import { Children, Content, Prop, View, required } from "@dlightjs/dlight"
import { type Typed, type Pretty, div, button, p, span } from "@dlightjs/types"

@View
class COOO {
  @Children(1)
    hh

  @Children(1)
    hhj

  Body() {
    this.hh
    this.hhj
  }
}
const COOOView = COOO as Pretty as Typed

@View
class App {
  count = 1
  toggle = false
  dlbCount = this.count * 2

  Body() {
    button(`toggle ${this.toggle}`)
      .onclick(() => {
        this.toggle = !this.toggle
      })
    // "fae"
    if (this.toggle) {
      div("okkk")
    } else {
      div("not ok")
        .style({
          color: "red"
        })
    }
    this.count
    this.dlbCount
    COOOView()
    {
      div("我说shit")
      div("nonono")
    }
  }
}

export default App as Pretty as Typed
