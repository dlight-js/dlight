import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WidthWideSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 4H2v16h20V4zM4 6h2v12H4V6zm16 12h-2V6h2v12z\"/>")
      .name("WidthWideSharp")
  }
}

export default WidthWideSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
