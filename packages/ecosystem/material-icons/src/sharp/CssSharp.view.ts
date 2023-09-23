import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CssSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9.5 15v-2H11v.5h2v-1H9.5V9h5v2H13v-.5h-2v1h3.5V15h-5zm6.5 0h5v-3.5h-3.5v-1h2v.5H21V9h-5v3.5h3.5v1h-2V13H16v2zm-8-4V9H3v6h5v-2H6.5v.5h-2v-3h2v.5H8z\"/>")
      .name("CssSharp")
  }
}

export default CssSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
