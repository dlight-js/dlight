import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NearMeSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3 3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z\"/>")
      .name("NearMeSharp")
  }
}

export default NearMeSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
