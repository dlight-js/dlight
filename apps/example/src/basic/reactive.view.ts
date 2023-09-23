// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View } from "@dlightjs/dlight"
import { type Typed, div, input } from "@dlightjs/types"

class ReactiveView extends View {
  name = ""
  mouseX = 0
  mouseY = 0
  color = (function() {
    if (this.mouseX > 250 && this.mouseY > 250) {
      return "red"
    } else if (this.mouseX > 250 && this.mouseY < 250) {
      return "yellow"
    } else if (this.mouseY < 250 && this.mouseX < 250) {
      return "blue"
    }
    return "purple"
  }.call(this))

  Body() {
    input()
      .type("range")
      .oninput((value) => {
        this.name = value.target?.value
      })
    div(`hi,${this.name}`)
    div()
      .style({
        width: "500px",
        height: "500px",
        backgroundColor: this.color
      })
      .onmousemove((event) => {
        this.mouseX = event.clientX
        this.mouseY = event.clientY
      })
    {
      div(`mouseX: ${this.mouseX}, moouseY: ${this.mouseY}`)
    }
  }
}

export default ReactiveView as any as Typed<{}>
