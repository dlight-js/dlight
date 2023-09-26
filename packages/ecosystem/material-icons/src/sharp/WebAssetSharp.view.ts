import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class WebAssetSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 4v16h18V4H3zm16 14H5V8h14v10z\"/>")
      .name("WebAssetSharp")
  }
}

export default WebAssetSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
