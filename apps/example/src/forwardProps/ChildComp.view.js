import { View } from "@dlightjs/dlight"

@View
class SubComp {
  @Prop isHappy = true

  View() {
    div(`I am ${this.isHappy ? "happy" : "sad"}!`)
  }
}

@ForwardProps
@View
class ChildComp {
  @Prop name = "John"

  View() {
    div(`I am the child ${this.name}!`)
      .forwardProps()
    SubComp()
      .forwardProps()
  }
}

export default ChildComp
