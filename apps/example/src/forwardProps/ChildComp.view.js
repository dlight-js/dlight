import { View } from "@dlightjs/dlight"

@View
class SubComp {
  @Prop isHappy = true

  Body() {
    div(`I am ${this.isHappy ? "happy" : "sad"}!`)
  }
}

@ForwardProps
@View
class ChildComp {
  @Prop name = "John"

  Body() {
    div(`I am the child ${this.name}!`)
      .forwardProps()
    SubComp()
      .forwardProps()
  }
}

export default ChildComp
