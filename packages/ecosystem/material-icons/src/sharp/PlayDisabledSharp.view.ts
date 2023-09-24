import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PlayDisabledSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16.45 13.62 19 12 8 5v.17zM2.81 2.81 1.39 4.22 8 10.83V19l4.99-3.18 6.79 6.79 1.41-1.42z\"/>")
      .name("PlayDisabledSharp")
  }
}

export default PlayDisabledSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
