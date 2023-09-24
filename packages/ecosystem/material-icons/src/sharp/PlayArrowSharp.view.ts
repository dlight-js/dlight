import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PlayArrowSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 5v14l11-7L8 5z\"/>")
      .name("PlayArrowSharp")
  }
}

export default PlayArrowSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
