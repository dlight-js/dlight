import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PlayCircleFilledRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 13.5v-7a.5.5 0 0 1 .8-.4l4.67 3.5c.27.2.27.6 0 .8l-4.67 3.5a.5.5 0 0 1-.8-.4z\"/>")
      .name("PlayCircleFilledRound")
  }
}

export default PlayCircleFilledRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
