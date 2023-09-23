import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FormatPaintSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 4V2H4v6h14V6h1v4H9v12h4V12h8V4h-3z\"/>")
      .name("FormatPaintSharp")
  }
}

export default FormatPaintSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
