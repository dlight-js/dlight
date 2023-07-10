import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WidthNormalSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 4H2v16h20V4zM4 6h4v12H4V6zm16 12h-4V6h4v12z\"/>")
      .name("WidthNormalSharp")
  }
}

export default WidthNormalSharp as any as Typed<DLightIconType>
