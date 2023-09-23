import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class StopSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 6h12v12H6V6z\"/>")
      .name("StopSharp")
  }
}

export default StopSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
