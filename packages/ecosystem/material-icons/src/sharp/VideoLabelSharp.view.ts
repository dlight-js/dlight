import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VideoLabelSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 3H1v18h22V3zm-2 13H3V5h18v11z\"/>")
      .name("VideoLabelSharp")
  }
}

export default VideoLabelSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
