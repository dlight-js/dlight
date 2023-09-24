import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class StayPrimaryPortraitSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5.01 1v22H19V1H5.01zM17 19H7V5h10v14z\"/>")
      .name("StayPrimaryPortraitSharp")
  }
}

export default StayPrimaryPortraitSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
