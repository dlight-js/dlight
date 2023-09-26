import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowRightAltRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16.01 11H5c-.55 0-1 .45-1 1s.45 1 1 1h11.01v1.79c0 .45.54.67.85.35l2.78-2.79c.19-.2.19-.51 0-.71l-2.78-2.79c-.31-.32-.85-.09-.85.35V11z\"/>")
      .name("ArrowRightAltRound")
  }
}

export default ArrowRightAltRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
