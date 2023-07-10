import { HStack } from "@dlightjs/components"
import { DLightIcon, DLightIconType, HelpOutlineOutlined } from "@dlightjs/material-icons"
import { View, $, type CustomNode } from "@dlightjs/dlight"
import { span, div, css } from "@dlightjs/easy-css"

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
    div(this.count)
    button("+")
      .onclick(this.onclick)
    this.jj()
  }
}

export default TestView
