import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FiberManualRecordRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"12\" cy=\"12\" r=\"8\"/>")
      .name("FiberManualRecordRound")
  }
}

export default FiberManualRecordRound as any as Typed<DLightIconType>
