import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PlayArrowRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z\"/>")
      .name("PlayArrowRound")
  }
}

export default PlayArrowRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
