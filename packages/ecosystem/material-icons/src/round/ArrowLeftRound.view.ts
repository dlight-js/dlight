import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowLeftRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12.29 8.71 9.7 11.3a.996.996 0 0 0 0 1.41l2.59 2.59c.63.63 1.71.18 1.71-.71V9.41c0-.89-1.08-1.33-1.71-.7z\"/>")
      .name("ArrowLeftRound")
  }
}

export default ArrowLeftRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
