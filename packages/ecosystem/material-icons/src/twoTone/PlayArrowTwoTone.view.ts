import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PlayArrowTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 8.64v6.72L15.27 12z\" opacity=\".3\"/><path d=\"m8 19 11-7L8 5v14zm2-10.36L15.27 12 10 15.36V8.64z\"/>")
      .name("PlayArrowTwoTone")
  }
}

export default PlayArrowTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
