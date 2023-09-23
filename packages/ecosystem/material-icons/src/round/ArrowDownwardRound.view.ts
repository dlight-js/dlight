import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowDownwardRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 5v11.17l-4.88-4.88c-.39-.39-1.03-.39-1.42 0a.996.996 0 0 0 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 1 0-1.41-1.41L13 16.17V5c0-.55-.45-1-1-1s-1 .45-1 1z\"/>")
      .name("ArrowDownwardRound")
  }
}

export default ArrowDownwardRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
