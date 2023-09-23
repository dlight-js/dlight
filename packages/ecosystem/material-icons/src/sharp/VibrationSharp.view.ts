import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VibrationSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M0 15h2V9H0v6zm3 2h2V7H3v10zm19-8v6h2V9h-2zm-3 8h2V7h-2v10zM18 3H6v18h12V3zm-2 16H8V5h8v14z\"/>")
      .name("VibrationSharp")
  }
}

export default VibrationSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
