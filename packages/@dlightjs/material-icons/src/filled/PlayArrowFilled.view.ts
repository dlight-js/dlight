import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
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

export default PlayArrowFilled as any as Typed<DLightIconType>
