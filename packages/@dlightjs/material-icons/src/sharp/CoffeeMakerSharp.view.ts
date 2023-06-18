import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CoffeeMakerSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 7V4h2V2H4v20h16v-2h-4.03A4.966 4.966 0 0 0 18 16v-5H8v5c0 1.64.81 3.09 2.03 4H6V4h2v3h10z\"/><circle cx=\"13\" cy=\"9\" r=\"1\"/>")
      .name("CoffeeMakerSharp")
  }
}

export default CoffeeMakerSharp as any as Typed<DLightIconType>
