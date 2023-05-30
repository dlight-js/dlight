import { View } from "@dlightjs/dlight"
import { div, button } from "@dlightjs/types"

class ReactiveView extends View {
  count = 1

  Body() {
    div(this.count)
    button("+")
      .onclick(() => {
        this.count++
      })
    button("-")
      .onclick(() => {
        this.count--
      })
  }
}

export default ReactiveView
