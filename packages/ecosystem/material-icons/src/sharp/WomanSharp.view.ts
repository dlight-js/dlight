import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class WomanSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13.41 7h-2.82L7 16h3v6h4v-6h3z\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/>")
      .name("WomanSharp")
  }
}

export default WomanSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
