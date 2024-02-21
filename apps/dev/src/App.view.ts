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
    setTimeout(() => {
      this.n *= 2
    }, 1000)
  }
}

@View
class jj {
  @Content what
  @Prop @Static nono

  model = use(MyModel, { count: this.what })
  @Watch
  jfae() {
    // console.trace()
    console.log(this.model)
  }

  View() {
    // env().jj(this.model.count)
    // {
    _(!console.log("update") && this.model.n)
    // }
  }
}

@Main
@View
class App {
  count = 100
  dblCount = this.count * 2

  View() {
    button("toggle").onClick(() => {
      this.count = this.count + 1
    })
    // No().props({
    //   _$content: this.count,
    //   onClick: () => {
    //     console.log("clicked")
    //   },
    // })
    jj(this.count).nono("no")
  }
}

export default App
