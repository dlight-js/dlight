import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowCircleLeftRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2 2 6.48 2 12zm10-2.79V11h3c.55 0 1 .45 1 1s-.45 1-1 1h-3v1.79c0 .45-.54.67-.85.35l-2.79-2.79c-.2-.2-.2-.51 0-.71l2.79-2.79a.5.5 0 0 1 .85.36z\"/>")
      .name("ArrowCircleLeftRound")
  }
}

export default ArrowCircleLeftRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
