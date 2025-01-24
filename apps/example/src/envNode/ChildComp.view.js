import { View } from "@dlightjs/dlight"

@View
class ChildComp {
  @Env textColor = "black"

  Body() {
    div("I'm supposed to be red").style({ color: this.textColor })
  }
}

export default ChildComp
