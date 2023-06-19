// ~> DoubleCount.view.js
import DLight, { View } from "@dlightjs/dlight"

class DoubleCount extends View {
  count = 10
  doubleCount = this.count * 2

  Body() {
    div(this.doubleCount)
  }
}

export default DoubleCount
