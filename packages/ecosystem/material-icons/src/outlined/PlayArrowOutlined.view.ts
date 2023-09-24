import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PlayArrowOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 8.64 15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z\"/>")
      .name("PlayArrowOutlined")
  }
}

export default PlayArrowOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
