import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NightlightRoundSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.5 22c1.05 0 2.05-.16 3-.46-4.06-1.27-7-5.06-7-9.54s2.94-8.27 7-9.54c-.95-.3-1.95-.46-3-.46-5.52 0-10 4.48-10 10s4.48 10 10 10z\"/>")
      .name("NightlightRoundSharp")
  }
}

export default NightlightRoundSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
