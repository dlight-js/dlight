import DLight, { View, $, type CustomNode } from "@dlightjs/dlight"
import { span, div, css } from "@dlightjs/easy-css"
import { button, SubView } from "@dlightjs/types"
import { HStack } from "@dlightjs/components"

class TestView extends View {
  onclick() {
    this.count++
  }

  count = 1
  @SubView
  jj() {
    div("hh")
  }

  Body() {
    HStack()
    {
      div(this.count)
      button("+")
        .onclick(this.onclick)
      this.jj()
    }
  }
}

export default TestView
