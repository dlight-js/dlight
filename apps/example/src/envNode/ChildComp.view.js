import { View } from "@dlightjs/dlight"

@View
class ChildComp {
  @Env textColor = "black"

  View() {
    div("I am a child component").style({ color: this.textColor })
  }
}

export default ChildComp
