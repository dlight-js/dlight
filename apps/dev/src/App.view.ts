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
  didMount() {
    console.log("jj")
  }
  View() {
    button("jj").onClick(() => {
      console.log("jj")
    })
  }
}
@View
class Sub {
  @Prop name = required
  @Prop onClick = required
  a

  didMount() {
    console.log(this.a.clientHeight, "shit")
  }
  @Watch
  watchName() {
    console.log(this.name)
  }

  View() {
    div().element(this.a)
    {
      JJ().element(el => {
        console.log(el[0].clientHeight)
      })
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
