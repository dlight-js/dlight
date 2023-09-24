import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LooksTwoSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3H3v18h18V3zm-6 10h-4v2h4v2H9v-6h4V9H9V7h6v6z\"/>")
      .name("LooksTwoSharp")
  }
}

export default LooksTwoSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
