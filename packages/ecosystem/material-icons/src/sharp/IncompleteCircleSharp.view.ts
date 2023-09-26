import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class IncompleteCircleSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12c0-2.76 1.12-5.26 2.93-7.07L12 12V2c5.52 0 10 4.48 10 10z\"/>")
      .name("IncompleteCircleSharp")
  }
}

export default IncompleteCircleSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
