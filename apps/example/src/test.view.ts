// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View } from "@dlightjs/dlight"
import { button, div, SubView } from "@dlightjs/types"

class TestView extends View {
  @Prop count = 2

  Body() {
    div(this.count)
    button("+")
      .onclick(() => {
        this.count++
      })
  }
}

export default TestView
