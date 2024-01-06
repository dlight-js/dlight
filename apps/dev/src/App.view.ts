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
class HH {
  didMount() {
    console.log("hh")
  }
  willUnmount() {
    console.log("hh will")
  }
  didUnmount() {
    console.log("hh unmounted")
  }
  View() {
    button("jj").onClick(() => {
      console.log("jj")
    })
  }
}
@View
class JJ {
  didMount() {
    console.log("jj")
  }
  willUnmount() {
    console.log("jj will")
  }
  didUnmount() {
    console.log("jj unmounted")
  }
  View() {
    HH()
  }
}
@View
class Sub {
  a
  hh = [1]
  didMount() {
    console.log(this.a.clientHeight, "shit")
  }

  View() {
    div().element(this.a)
    {
      button("+").onClick(() => {
        this.hh = [...this.hh, this.hh.length]
      })
      button("-").onClick(() => {
        this.hh = [...this.hh.slice(0, -1)]
      })
      for (const i of this.hh) {
        div()
        {
          div()
          {
            JJ().element(el => {
              console.log(el[0].clientHeight, "shit fuck")
            })
          }
        }
      }
    }
  }
}
@View
class App {
  count = 0
  arr = [1, 2, 3]

  View() {
    Sub()
  }
}

export default App as Pretty as Typed
