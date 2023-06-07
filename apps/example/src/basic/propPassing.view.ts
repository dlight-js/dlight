// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View } from "@dlightjs/dlight"
import { type Typed, div, button, Prop, type RequiredProp, required } from "@dlightjs/types"

class SubViewClass extends View {
  /**
   * @Prop xxx
   */
  @Prop count: RequiredProp<number> = required
  @Prop message: Prop<string> = "defaultMessage" as any

  Body() {
    div(this.message)
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

const SubView = SubViewClass as any as Typed<SubViewClass>

class PropPassingView extends View {
  Body() {
    SubView()
      .count(1)
  }
}

export default PropPassingView
