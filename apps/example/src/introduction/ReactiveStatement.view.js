
import { View } from "@dlightjs/dlight"

@View
class ReactiveStatement {
  count = 0

  View() {
    div("count")
    div(this.count)
    div("double count")
    div(this.count * 2)
    button("+")
      .onclick(() => {
        this.count++
      })
  }
}

export default ReactiveStatement
