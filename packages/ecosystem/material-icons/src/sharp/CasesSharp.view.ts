import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CasesSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 5V1h-8v4H5v13h18V5h-5zm-2 0h-4V3h4v2zM3 9H1v13h18v-2H3V9z\"/>")
      .name("CasesSharp")
  }
}

export default CasesSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
