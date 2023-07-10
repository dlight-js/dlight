import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
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

export default BrandingWatermarkSharp as any as Typed<DLightIconType>
