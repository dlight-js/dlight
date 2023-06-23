import { HStack } from "@dlightjs/components"
import DLight, { View, $, type CustomNode } from "@dlightjs/dlight"
import { styled } from "@dlightjs/emotion"
import { path, required, span, svg, canvas } from "@dlightjs/types"
import { div, Prop, type Typed, _, button, SubView } from "@dlightjs/types"
import { transformWithEsbuild } from "vite"
import { DLightIcon, DLightIconType, HelpOutlineOutlined } from "@dlightjs/material-icons"


class GG extends View {
  _$forwardProps = true
  Body() {
    div("okkkk")
      .forwardProps()
  }
}

class HH extends View {
  _$forwardProps = true
  Body() {
    GG()
      .forwardProps()
  }
}



class TestView extends View {
  canvasEl?: HTMLCanvasElement

  didMount() {
    const ctx = this.canvasEl!.getContext("2d")!
    ctx.fillStyle = "green"
    ctx.fillRect(10, 10, 150, 100)
  }

  Body() {
    canvas()
      .element(this.canvasEl)

    HH()
      .style({
        backgroundColor: "red"
      })
      .onclick(() => {
        console.log("shit")
      })
    // HelpOutlineOutlined()
    //   .style({
    //     backgroundColor: "red"
    //   })
  }
}

export default TestView
