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
  @Children hh
  @Env jj
  didUnmount() {
    console.log("unmount", this.id)
  }

  View() {
    this.hh
  }
}
@View
class App {
  count = 0
  jj = this.count * 2
  arr = [0, 1, 2, 3]

  didMount() {
    console.log("did mount")
  }
  @Watch("count")
  didUpdate() {
    console.log("did update")
  }

  View() {
    div(this.jj)
    button("+").onClick(() => {
      // this.arr = Array.from({ length: 10000 }).map((_, i) => i)
      this.arr = [...this.arr, this.arr.length]
      this.count++
    })
    button("-").onClick(() => {
      this.arr = []
      this.arr = [...this.arr.slice(0, -2), ...this.arr.slice(-1)]
    })
    // env().jj(100)
    // {
    div()
    {
      div()
      {
        for (const i of this.arr) {
          div(i)
        }
      }
    }
    // }

    // for (const j of this.arr) {
    // for (const i of this.arr) {
    //   key: i
    //   div()
    //   {
    //     div()
    //     {
    //       div()
    //       {
    //         IfTest().id(i)
    //       }
    //     }
    //   }
    // }
    // }
  }
}

export default App as Pretty as Typed
