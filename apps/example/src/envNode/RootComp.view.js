import { View } from "@dlightjs/dlight"
import ChildComp from "./ChildComp.view"

@View
class RootComp {
  textColor = "red"

  Body() {
    env().textColor(this.textColor)
    {
      div("I am a parent component")
      ChildComp()
    }
    button("Click me to toggle the color to blue/red").onClick(() => {
      this.textColor = this.textColor === "red" ? "blue" : "red"
    })
  }
}

export default RootComp
