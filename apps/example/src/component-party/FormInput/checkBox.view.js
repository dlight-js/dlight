// ~> IsAvailable.view.js
import DLight, { View } from "@dlightjs/dlight"

class IsAvailable extends View {
  isAvailable = false

  Body() {
    input(this.text)
      .type("checkbox")
      .id("is-available")
      .checked(this.isAvailable)
      .onchange(() => { this.isAvailable = !this.isAvailable })
    label()
      .htmlFor("is-available")
  }
}
