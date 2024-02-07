import { View, update, Model } from "@dlightjs/dlight"
import {
  type Typed,
  type Pretty,
  button,
  ForwardProps,
  Prop,
  Watch,
  required,
  div,
  tbody,
  Modeling,
  use,
} from "@dlightjs/types"

@View
@ForwardProps
class Comp {
  @Content ok
  View() {
    div().forwardProps()
    div(this.ok + 10000)
  }
}

@View
class App {
  obj = {
    nest: {
      nest2: {
        count: 1,
      },
    },
  }

  View() {
    button("+").onClick(() => {
      this.obj.nest.nest2.count++
      this.obj.nest.nest2.count++
    })
    Comp(
      (() => {
        console.log("updated")
        return this.obj.nest.nest2.count + 2
      })()
    ).onClick(() => {
      console.log("ok")
    })
  }
}

export default App
