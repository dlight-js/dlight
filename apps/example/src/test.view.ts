// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View } from "@dlightjs/dlight"
import { button, div, SubView } from "@dlightjs/types"
import { HStack } from "@dlightjs/components"

class TestView extends View {
  aa = 1

  Body() {
    div(this.aa)
      .className("ok")
      .className("fine jj")
      .className(this.aa === 0 ? "yes" : undefined)

    button("+")
      .onclick(() => {
        this.aa++
      })
    button("-")
      .onclick(() => {
        this.aa--
      })
  }
}

export default TestView
