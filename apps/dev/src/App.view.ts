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
import { Button } from "./Button100.view"

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
  flag = true

  View() {
    button("toggle").onClick(() => {
      this.flag = !this.flag
    })
    if (this.flag) {
      for (const i of [...Array(5000).keys()]) {
        Button(i)
      }
    }
  }
}

export default App as Pretty as Typed
