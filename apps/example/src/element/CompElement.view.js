import { View } from "@dlightjs/dlight"

@View
class ChildComp {
  View() {
    div("I am a child component").style({ color: "red" })
  }
}

@View
class CompElement {
  View() {
    div("I am a parent component")
    ChildComp().element(els => {
      els[0].style.color = "blue"
    })
  }
}

export default CompElement
