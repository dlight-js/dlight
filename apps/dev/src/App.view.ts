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
} from "@dlightjs/dlight"

import { Button } from "./Button100.view"
@Model
class MyModel {
  @Prop count = 0
  dblCount = this.count * 2

  @Watch
  watchCount() {
    console.log("count changed", this.dblCount)
  }
}
@Main
@View
class App {
  count = 1
  dblCount = this.count * 2
  model = use(MyModel, { count: this.dblCount })
  View() {
    button("toggle").onClick(() => {
      this.flag = !this.flag
    })
    if (this.flag) {
      MyComp()
    }
  }
}

export default App
