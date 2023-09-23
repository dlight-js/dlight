import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WomanSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13.41 7h-2.82L7 16h3v6h4v-6h3z\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/>")
      .name("WomanSharp")
  }
}

export default WomanSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
