import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SportsEsportsSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 5H4L2 19h4l3-3h6l3 3h4L20 5zm-9 6H9v2H8v-2H6v-1h2V8h1v2h2v1zm4-1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z\"/>")
      .name("SportsEsportsSharp")
  }
}

export default SportsEsportsSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
