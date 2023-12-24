import { View } from "@dlightjs/dlight"
import ChildComp from "./ChildNode.view"

@View
class ParentComp {
  View() {
    div("I am parent!")
    ChildComp()
      .name("Cindy")
    ChildComp()
      .name("Tom")
    ChildComp()
  }
}

export default ParentComp
