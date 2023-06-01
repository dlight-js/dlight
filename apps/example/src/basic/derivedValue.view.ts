import { View } from "@dlightjs/dlight"
import { button, div } from "@dlightjs/types"

class DerivedValueView extends View {
  count = 1
  doubled = this.count * 2
  quadrupled = this.doubled * 2
  Body() {
    div()
      ._padding("20px")
      ._border("1px solid black")
      ._width("100px")
    {
      button("count ++")
        .onclick(() => {
          this.count++
        })
      div(`count: ${this.count}`)
      div(`${this.count} * 2 = ${this.doubled}`)
      div(`${this.doubled} * 2 = ${this.quadrupled}`)
    }
  }
}

export default DerivedValueView
