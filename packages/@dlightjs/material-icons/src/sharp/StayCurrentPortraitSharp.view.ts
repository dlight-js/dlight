import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class StayCurrentPortraitSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 1.01 5.01 1v22H19V1.01zM17 19H7V5h10v14z\"/>")
      .name("StayCurrentPortraitSharp")
  }
}

export default StayCurrentPortraitSharp as any as Typed<DLightIconType>
