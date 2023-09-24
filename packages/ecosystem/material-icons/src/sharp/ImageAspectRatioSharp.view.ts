import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ImageAspectRatioSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 10h-2v2h2v-2zm0 4h-2v2h2v-2zm-8-4H6v2h2v-2zm4 0h-2v2h2v-2zm10-6H2v16h20V4zm-2 14H4V6h16v12z\"/>")
      .name("ImageAspectRatioSharp")
  }
}

export default ImageAspectRatioSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
