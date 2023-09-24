import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PhotoSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 21V3H3v18h18zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z\"/>")
      .name("PhotoSharp")
  }
}

export default PhotoSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
