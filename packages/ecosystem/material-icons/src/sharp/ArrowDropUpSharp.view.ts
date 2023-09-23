import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowDropUpSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m7 14 5-5 5 5H7z\"/>")
      .name("ArrowDropUpSharp")
  }
}

export default ArrowDropUpSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
