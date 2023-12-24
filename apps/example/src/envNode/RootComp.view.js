import { View } from "@dlightjs/dlight"
import ChildComp from "./ChildComp.view"

@View
class RootComp {
  textColor = "red"

  View() {
    env().textColor(this.textColor)
    {
      div("I am a parent component")
      ChildComp()
    }
  }
}

export default RootComp
