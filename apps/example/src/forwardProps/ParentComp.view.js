import { View } from "@dlightjs/dlight"
import ChildComp from "./ChildComp.view"

@View
class ParentComp {
  View() {
    div("I am parent!")
    ChildComp()
      .name("Cindy")
      .style({
        color: "red"
      })
    ChildComp()
      .name("Tom")
      .style({
        color: "blue"
      })
      .isHappy(false)
    ChildComp()
      .isHappy(false)
  }
}

export default ParentComp
