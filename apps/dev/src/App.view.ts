import {
  View,
  update,
  Model,
  use,
  Modeling,
  Pretty,
  Prop,
  Watch,
  button,
  div,
  Main,
  Mount,
  ForwardProps,
  Content,
} from "@dlightjs/dlight"

import { Button } from "./Button100.view"
@Model
class MyModel {
  @Prop count = 0
  dblCount = this.count * 2
  n = 100
  n2 = 100
  n3 = 100
  @Watch
  watchCount() {
    console.log("count changed", this.dblCount)
    this.n = this.dblCount
    this.n2 = this.dblCount
    this.n3 = this.dblCount
    // setTimeout(() => {
    //   this.n *= 2
    // }, 1000)
  }
}

@View
class jj {
  @Content what
  @Prop nono

  model = use(MyModel, { count: this.what })
  @Watch
  jfae() {
    // console.trace()
    console.log(this.model, "what changed")
  }

  View() {
    // env().jj(this.model.count)
    // {
    _(!console.log("update") && this.model.n)
    // }
  }
}

@Model
class JJModel {
  count = 101
  jj = 210
  ok() {
    this.count = 0
  }
  nono() {
    this.jj = 100
  }
}
@Main
@View
class App {
  count = 101
  m = use(JJModel)
  jj = 210

  View() {
    jj(this.count).nono(this.jj)
    button("+").onClick(() => {
      this.count++
    })
    button("-").onClick(() => {
      this.m.ok()
    })

    button("?").onClick(() => {
      this.m.nono()
    })

    if (this.m.count > 100) {
      if (this.m.jj > 200) {
        _(View => div("ok"))
      }
    } else {
      div("no")
    }
  }
}

export default App
