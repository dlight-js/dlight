import { View, setGlobal } from "@dlightjs/dlight"
import {
  type Typed,
  type Pretty,
  button,
  ForwardProps,
  Prop,
  Watch,
  required,
} from "@dlightjs/types"

@View
class JJ {
  @Prop id
  didUnmount() {
    console.log("jjj", this.id)
  }

  View() {
    div(this.id)
  }
}

@View
class IfTest {
  @Prop id
  didUnmount() {
    console.log("unmount", this.id)
  }

  View() {
    if (this.id > -100) {
      JJ().id(this.id)
    }
  }
}
@View
class App {
  count = 0
  arr = [0, 1, 2, 3]

  View() {
    button("+").onClick(() => {
      this.arr = [...this.arr, Math.random() * 100]
    })
    button("-").onClick(() => {
      this.arr = [...this.arr.slice(0, -2), ...this.arr.slice(-1)]
    })
    // for (const j of this.arr) {
    for (const i of this.arr) {
      key: i
      div()
      {
        div()
        {
          div()
          {
            IfTest().id(i)
          }
        }
      }
    }
    // }
  }
}

export default App as Pretty as Typed
