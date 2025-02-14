import { View } from "@dlightjs/dlight"

@View
class Reactivity {
  count = 0

  Body() {
    div(this.count)
    button("+").onclick(() => {
      this.count++
    })
  }
}

export default Reactivity
