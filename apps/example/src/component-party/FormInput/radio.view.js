// ~> PickPill.view.js
import DLight, { View } from "@dlightjs/dlight"

class PickPill extends View {
  picked = "red"

  handleChange(event) {
    this.picked = event.target.value
  }

  Body() {
    div(`Picked: ${this.picked}`)
    input(this.text)
      .id("blue-pill")
      .type("radio")
      .checked(this.picked === "blue")
      .onchange(this.handleChange.bind(this))
    label("Blue pill")
      .htmlFor("blue-pill")
    input(this.text)
      .id("red-pill")
      .type("radio")
      .checked(this.picked === "red")
      .onchange(this.handleChange.bind(this))
    label("Red pill")
      .htmlFor("red-pill")
  }
}
