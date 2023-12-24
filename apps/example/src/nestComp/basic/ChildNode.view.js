import { View } from "@dlightjs/dlight"

@View
class ChildComp {
  @Prop name = "John"

  View() {
    div(`I am the child ${this.name}!`)
  }
}

export default ChildComp
