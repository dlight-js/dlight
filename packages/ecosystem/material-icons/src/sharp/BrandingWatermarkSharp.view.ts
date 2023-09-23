import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BrandingWatermarkSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 3H1v18h22V3zm-2 16h-9v-6h9v6z\"/>")
      .name("BrandingWatermarkSharp")
  }
}

export default BrandingWatermarkSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
