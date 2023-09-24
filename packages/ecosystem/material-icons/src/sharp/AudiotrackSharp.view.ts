import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AudiotrackSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z\"/>")
      .name("AudiotrackSharp")
  }
}

export default AudiotrackSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
