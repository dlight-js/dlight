// ~> Name.view.js
import DLight, { View } from "@dlightjs/dlight"

class Name extends View {
  name = "John"

  Body() {
    h1(this.name)
  }
}

export default Name
