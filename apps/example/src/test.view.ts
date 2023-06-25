import { HStack } from "@dlightjs/components"
// import { css } from "@dlightjs/emotion"
import css from "@iandx/easy-css"
import { path, required, span, svg, canvas, PropWrapper } from "@dlightjs/types"
import { div, Prop, type Typed, _, button, SubView } from "@dlightjs/types"
import { transformWithEsbuild } from "vite"
import { DLightIcon, DLightIconType, HelpOutlineOutlined } from "@dlightjs/material-icons"
import { Div, Span, Img } from "@dlightjs/easy-css"
import DLight, { View, $, type CustomNode } from "@dlightjs/dlight"

const fuckMe = css`
width: 1200px;.ok {color: red;}height: 200px;
`
class TestView extends View {
  Body() {
    Div("ok")
      .margin("100px")
      .backgroundColor("red")

    span("ok")
      .className(fuckMe)
    {
      span("shit")
        .className("ok")
    }
  }
}

export default TestView
