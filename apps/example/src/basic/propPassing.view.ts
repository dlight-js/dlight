import { View } from "@dlightjs/dlight"
import Types, { div, button, Prop, required } from "@dlightjs/types"

class SubViewClass extends View {
  /**
   * @Prop 我草这jb都能看见
   */
  @Prop count: Prop<any> = required

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
      .count(12)
  }
}

export default PropPassingView
