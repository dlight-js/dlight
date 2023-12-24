
import { View } from "@dlightjs/dlight"

@View
class Reactivity {
  count = 0

  View() {
    div(this.count)
    button("+")
      .onclick(() => {
        this.count++
      })
  }
}

export default Reactivity
