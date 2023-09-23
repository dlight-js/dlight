import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SwipeLeftAltRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10.1 13a5 5 0 1 0 0-2H5.83l.88-.88A.996.996 0 1 0 5.3 8.71L2.71 11.3a.996.996 0 0 0 0 1.41L5.3 15.3a.996.996 0 1 0 1.41-1.41L5.83 13h4.27z\"/>")
      .name("SwipeLeftAltRound")
  }
}

export default SwipeLeftAltRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
