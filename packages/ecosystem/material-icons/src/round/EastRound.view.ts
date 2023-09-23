import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class EastRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14.29 5.71a.996.996 0 0 0 0 1.41L18.17 11H3c-.55 0-1 .45-1 1s.45 1 1 1h15.18l-3.88 3.88a.996.996 0 1 0 1.41 1.41l5.59-5.59a.996.996 0 0 0 0-1.41l-5.6-5.58a.996.996 0 0 0-1.41 0z\"/>")
      .name("EastRound")
  }
}

export default EastRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
