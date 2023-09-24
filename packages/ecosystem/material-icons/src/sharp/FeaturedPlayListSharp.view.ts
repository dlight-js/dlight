import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FeaturedPlayListSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 3H1v18h22V3zm-11 8H3V9h9v2zm0-4H3V5h9v2z\"/>")
      .name("FeaturedPlayListSharp")
  }
}

export default FeaturedPlayListSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
