// ~> InputFocused.view.js
import DLight, { View } from "@dlightjs/dlight"

class InputFocused extends View {
  inputElement

  didMount() {
    this.inputElement.focus()
  }

  Body() {
    input()
      .type("text")
      .element(this.inputElement)
  }
}
