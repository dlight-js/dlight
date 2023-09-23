import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DehazeSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 16v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20V6H2z\"/>")
      .name("DehazeSharp")
  }
}

export default DehazeSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
