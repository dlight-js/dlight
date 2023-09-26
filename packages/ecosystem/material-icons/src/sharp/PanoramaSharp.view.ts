import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PanoramaSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 20V4H1v16h22zM8.5 12.5l2.5 3.01L14.5 11l4.5 6H5l3.5-4.5z\"/>")
      .name("PanoramaSharp")
  }
}

export default PanoramaSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
