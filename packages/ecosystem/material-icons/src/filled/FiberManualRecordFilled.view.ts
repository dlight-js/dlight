import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FiberManualRecordFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"12\" cy=\"12\" r=\"8\"/>")
      .name("FiberManualRecordFilled")
  }
}

export default FiberManualRecordFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
