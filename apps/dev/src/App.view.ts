import { View } from "@dlightjs/dlight"
import {
  type Typed,
  type Pretty,
  button,
  ForwardProps,
  Prop,
  Watch,
  required,
} from "@dlightjs/types"

interface SubProp {
  name?: string
  onClick: () => void
}
@View
class Sub {
  @Prop name = required
  @Prop onClick = required

  @Watch
  watchName() {
    console.log(this.name)
  }

  View() {
    button(this.name).onClick(this.onClick)
  }
}

const SubView = Sub as Pretty as Typed<SubProp>

@ForwardProps
@View
class Ok {
  View() {
    button("ok").forwardProps()
    SubView().forwardProps()
  }
}
const OkView = Ok as Pretty

@View
class App {
  count = 0
  arr = [0, 1]

  View() {
    button("+").onClick(() => {
      this.count++
    })
    OkView()
      .style({
        color: "red",
      })
      .onClick(() => {
        console.log(this.count)
      })
      .name("shit")
  }
}

export default App as Pretty as Typed
