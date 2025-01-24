
import { View } from "@dlightjs/dlight"

@View
class Function {
  count = 0

  handleClick() {
    this.count++
  }

  Body() {
    div(this.count)
    button("+")
      .onclick(this.handleClick)
  }
}

export default Function
