import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VideoCallSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 10.5V6H3v12h14v-4.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z\"/>")
      .name("VideoCallSharp")
  }
}

export default VideoCallSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
