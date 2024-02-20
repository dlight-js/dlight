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

@ForwardProps
@View
class No {
  View() {
    div().forwardProps()
  }
}

@Main
@View
class App {
  count = 100
  dblCount = this.count * 2
  model = use(MyModel, { count: this.dblCount })
  View() {
    button("toggle").onClick(() => {
      this.count = this.count + 1
    })
    No().props({
      _$content: this.count,
      onClick: () => {
        console.log("clicked")
      },
    })
  }
}

export default App
