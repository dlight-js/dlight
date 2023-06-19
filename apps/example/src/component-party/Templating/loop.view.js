// ~> Colors.view.js
import DLight, { View } from "@dlightjs/dlight"

class Colors extends View {
  colors = ["red", "green", "blue"]

  Body() {
    ul()
    {
      for (const color of this.colors) {
        li(color)
      }
    }
  }
}

export default Colors
