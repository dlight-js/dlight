
import { View } from "@dlightjs/dlight"

@View
class Function {
  count = 0

  handleClick() {
    this.count++
  }

  View() {
    div(this.count)
    button("+")
      .onclick(this.handleClick)
  }
}

export default Function
