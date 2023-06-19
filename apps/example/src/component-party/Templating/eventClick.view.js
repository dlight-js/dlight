// ~> Counter.view.js
import DLight, { View } from "@dlightjs/dlight"

class Counter extends View {
  count = 0

  Body() {
    p(`Counter: ${this.count}`)
    button("+1")
      .onclick(() => {
        this.count++
      })
  }
}

export default Counter
