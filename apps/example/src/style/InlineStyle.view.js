import { View } from "@dlightjs/dlight"

@View
class InlineStyle {
  View() {
    div("I am a red text")
      .style({ color: "red", fontWeight: "bold" })
  }
}

export default InlineStyle
