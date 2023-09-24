import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TurnLeftSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m6.83 11 1.58 1.59L7 14l-4-4 4-4 1.41 1.41L6.83 9H17v11h-2v-9z\"/>")
      .name("TurnLeftSharp")
  }
}

export default TurnLeftSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
