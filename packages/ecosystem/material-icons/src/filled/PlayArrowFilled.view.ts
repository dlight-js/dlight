import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PlayArrowFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 5v14l11-7z\"/>")
      .name("PlayArrowFilled")
  }
}

export default PlayArrowFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
