import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FiberManualRecordSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"12\" cy=\"12\" r=\"8\"/>")
      .name("FiberManualRecordSharp")
  }
}

export default FiberManualRecordSharp as any as Typed<DLightIconType>
