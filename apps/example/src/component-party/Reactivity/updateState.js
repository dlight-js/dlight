// ~> Name.view.js
import DLight, { View } from "@dlightjs/dlight"

class Name extends View {
  name = "John"

  beforeInit() {
    this.name = "Jane"
  }

  Body() {
    h1(this.name)
  }
}
