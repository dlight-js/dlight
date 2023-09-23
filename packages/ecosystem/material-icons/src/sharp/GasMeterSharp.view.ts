import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class GasMeterSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 4h-5V2h-2v2h-2V2H9v2H4v18h16V4zm-8 14c-1.38 0-2.5-1.1-2.5-2.46 0-1.09.43-1.39 2.5-3.79 2.05 2.38 2.5 2.7 2.5 3.79C14.5 16.9 13.38 18 12 18zm4-8H8V8h8v2z\"/>")
      .name("GasMeterSharp")
  }
}

export default GasMeterSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
