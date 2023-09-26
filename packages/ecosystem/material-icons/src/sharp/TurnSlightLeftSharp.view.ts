import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TurnSlightLeftSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11.66 6V4H6v5.66h2V7.41l5 5V20h2v-8.41L9.41 6z\"/>")
      .name("TurnSlightLeftSharp")
  }
}

export default TurnSlightLeftSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
