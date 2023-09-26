import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TurnSharpRightSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m18 6.83 1.59 1.58L21 7l-4-4-4 4 1.41 1.41L16 6.83V13H6v8h2v-6h10z\"/>")
      .name("TurnSharpRightSharp")
  }
}

export default TurnSharpRightSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
