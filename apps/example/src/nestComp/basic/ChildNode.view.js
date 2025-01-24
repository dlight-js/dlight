import { View } from "@dlightjs/dlight"

@View
class ChildComp {
  @Prop name = "John"

  Body() {
    div(`I am the child ${this.name}!`)
  }
}

export default ChildComp
