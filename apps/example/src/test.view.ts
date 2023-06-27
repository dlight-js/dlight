import { HStack } from "@dlightjs/components"
// import { css } from "@dlightjs/emotion"
import { transformWithEsbuild } from "vite"
import { DLightIcon, DLightIconType, HelpOutlineOutlined } from "@dlightjs/material-icons"
import DLight, { View, $, type CustomNode } from "@dlightjs/dlight"
import { span, div, css } from "@dlightjs/easy-css"

const fuck = css`
color: red;
`

class TestView extends View {
  margin = "20px"
  Body() {
    div()
      .margin(this.margin)
      .flex_()

    {
      div("shit")
        .className(fuck)
        .margin(this.margin)
        .alignBaseline()
        .text2xl()
      div("i")
    }
  }
}

export default TestView
