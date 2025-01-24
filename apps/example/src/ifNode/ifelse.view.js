import { View } from "@dlightjs/dlight"

@View
class IfElse {
  count = 0

  addCount() {
    this.count++
  }

  minusCount() {
    this.count--
  }

  Body() {
    div(`Count: ${this.count}`)
    button("+")
      .onClick(this.addCount)
    button("-")
      .onClick(this.minusCount)
    if (this.count > 0) {
      div("Count is larger than 0")
    } else if (this.count < 0) {
      div("Count is smaller than 0")
    } else {
      div("Count is 0")
    }
  }
}

export default IfElse
