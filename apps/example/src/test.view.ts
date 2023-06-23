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
  hh = [{ item: [1, 2, 3] }, { item: [1, 2, 3] }]
  Body() {
    for (const [idx, { item }] of this.hh.entries()) {
      for (const ite of item) {
        div(`${ite} + ${idx}`)
      }
    }
    // HelpOutlineOutlined()
    //   .style({
    //     backgroundColor: "red"
    //   })
  }
}

export default TestView
