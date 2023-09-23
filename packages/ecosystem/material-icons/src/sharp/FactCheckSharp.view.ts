import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FactCheckSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path fill-rule=\"evenodd\" d=\"M2 3v18h20V3H2zm8 14H5v-2h5v2zm0-4H5v-2h5v2zm0-4H5V7h5v2zm4.82 6L12 12.16l1.41-1.41 1.41 1.42L17.99 9l1.42 1.42L14.82 15z\"/>")
      .name("FactCheckSharp")
  }
}

export default FactCheckSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
