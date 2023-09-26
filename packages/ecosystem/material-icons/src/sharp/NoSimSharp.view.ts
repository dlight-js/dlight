import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NoSimSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3.79 3.74 2.38 5.15l2.74 2.74-.12.12V21h13.27l1.58 1.62 1.41-1.41zM19 16.11V3h-8.99L7.95 5.06z\"/>")
      .name("NoSimSharp")
  }
}

export default NoSimSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
