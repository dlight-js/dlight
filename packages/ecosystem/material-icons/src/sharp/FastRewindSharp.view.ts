import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FastRewindSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 18V6l-8.5 6 8.5 6zm.5-6 8.5 6V6l-8.5 6z\"/>")
      .name("FastRewindSharp")
  }
}

export default FastRewindSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
