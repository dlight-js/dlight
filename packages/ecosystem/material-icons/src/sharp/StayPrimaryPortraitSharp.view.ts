import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class StayPrimaryPortraitSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5.01 1v22H19V1H5.01zM17 19H7V5h10v14z\"/>")
      .name("StayPrimaryPortraitSharp")
  }
}

export default StayPrimaryPortraitSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
