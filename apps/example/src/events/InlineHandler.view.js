import { View } from "@dlightjs/dlight"

@View
class InlineHandler {
  color = "red"

  View() {
    button("Hover Me!")
      .style({ backgroundColor: this.color })
      .onMouseEnter(() => {
        this.color = "blue"
      })
      .onMouseOut(() => {
        this.color = "red"
      })
  }
}

export default InlineHandler
