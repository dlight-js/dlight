import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FeedSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 3H3v18h18V8l-5-5zM7 7h5v2H7V7zm10 10H7v-2h10v2zm0-4H7v-2h10v2zm-2-4V5l4 4h-4z\"/>")
      .name("FeedSharp")
  }
}

export default FeedSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
