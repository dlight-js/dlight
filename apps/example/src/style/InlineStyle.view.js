import { View } from "@dlightjs/dlight"

@View
class InlineStyle {
  Body() {
    div("I am a red text")
      .style({ color: "red", fontWeight: "bold" })
  }
}

export default InlineStyle
