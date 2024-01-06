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
  View() {
    div("ok")
  }
}

@View
class Sub {
  a
  hh = [1]
  View() {
    div()
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
            JJ()
              .hh(this.hh)
              .onUpdate((_, jj, __, a) => {
                console.log("changed", a.length)
              })
          }
        }
      }
    }
  }
}
@View
class IfTest {
  @Content count = 0

  View() {}
}
@View
class App {
  count = 0
  arr = [1, 2, 3]

  @View
  jj({ content }) {
    div()
    {
      div()
      {
        // div(this.count).onUpdate(() => {
        //   console.log("hh")
        // })
        if (this.count === 0) {
          div("okk")
        } else {
          div(this.count).onUpdate((node, key, value, nextValue) => {
            console.log("updated", key, value, nextValue)
          })
        }
        button("+").onClick(() => {
          this.count++
        })
      }
    }
  }

  View() {
    Sub()
    button("+").onClick(() => {
      this.count++
    })
  }
}

export default App as Pretty as Typed
