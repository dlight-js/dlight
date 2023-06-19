// ~> InputHello.view.js
import DLight, { View } from "@dlightjs/dlight"

class InputHello extends View {
  text = "Hello world"

  Body() {
    p(this.text)
    input()
      .value(this.text)
      .oninput(e => {
        this.text = e.target.value
      })
  }
}

export default InputHello
