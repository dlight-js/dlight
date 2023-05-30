import { View } from "@dlightjs/dlight"
import Types, { div, button, Prop, required } from "@dlightjs/types"

class SubViewClass extends View {
  @Prop count: Prop<number> = required

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
const SubView = Types(SubViewClass)

class PropPassingView extends View {
  Body() {
    SubView()
      .count(11)
  }
}

export default PropPassingView
