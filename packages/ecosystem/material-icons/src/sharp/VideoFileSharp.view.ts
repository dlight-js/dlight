import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VideoFileSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 2H4v20h16V8l-6-6zm-1 7V3.5L18.5 9H13zm1 5 2-1.06v4.12L14 16v2H8v-6h6v2z\"/>")
      .name("VideoFileSharp")
  }
}

export default VideoFileSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
