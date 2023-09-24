import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class RemoveRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z\"/>")
      .name("RemoveRound")
  }
}

export default RemoveRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
