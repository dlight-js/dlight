import { View } from "@dlightjs/dlight"
import Types, { div, button, Prop, type RequiredProp, required } from "@dlightjs/types"

class SubViewClass extends View {
  @Prop count: RequiredProp<number> = required
  @Prop message: Prop<string> = "whatever" as any

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
      .count(1)
  }
}

export default PropPassingView
