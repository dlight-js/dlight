import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CoffeeMakerSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 7V4h2V2H4v20h16v-2h-4.03A4.966 4.966 0 0 0 18 16v-5H8v5c0 1.64.81 3.09 2.03 4H6V4h2v3h10z\"/><circle cx=\"13\" cy=\"9\" r=\"1\"/>")
      .name("CoffeeMakerSharp")
  }
}

export default CoffeeMakerSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
