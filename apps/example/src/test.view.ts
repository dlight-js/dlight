import { HStack } from "@dlightjs/components"
import DLight, { View, $, type CustomNode } from "@dlightjs/dlight"
import { styled } from "@dlightjs/emotion"
import { path, required, span, svg, canvas } from "@dlightjs/types"
import { div, Prop, type Typed, _, button, SubView } from "@dlightjs/types"
import { transformWithEsbuild } from "vite"
import { DLightIcon, DLightIconType, HelpOutlineOutlined } from "@dlightjs/material-icons"

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
  }
}

export default TestView
