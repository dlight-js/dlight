import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TvSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 3H1v16h7v2h8v-2h6.99L23 3zm-2 14H3V5h18v12z\"/>")
      .name("TvSharp")
  }
}

export default TvSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
