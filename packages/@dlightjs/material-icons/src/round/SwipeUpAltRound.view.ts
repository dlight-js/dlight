import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SwipeUpAltRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m13 5.41.88.88a.996.996 0 1 0 1.41-1.41L12.7 2.29a.996.996 0 0 0-1.41 0L8.71 4.88a.996.996 0 1 0 1.41 1.41l.88-.88v4.27a5 5 0 1 0 2 0V5.41z\"/>")
      .name("SwipeUpAltRound")
  }
}

export default SwipeUpAltRound as any as Typed<DLightIconType>
