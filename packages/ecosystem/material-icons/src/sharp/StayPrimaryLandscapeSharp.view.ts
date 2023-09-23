import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class StayPrimaryLandscapeSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M1 19h22V5H1v14zM19 7v10H5V7h14z\"/>")
      .name("StayPrimaryLandscapeSharp")
  }
}

export default StayPrimaryLandscapeSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
