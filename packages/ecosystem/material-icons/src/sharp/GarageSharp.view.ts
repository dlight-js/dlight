import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class GarageSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"15\" cy=\"13\" r=\"1\"/><circle cx=\"9\" cy=\"13\" r=\"1\"/><path d=\"m8.33 7.5-.66 2h8.66l-.66-2z\"/><path d=\"M22 2H2v20h20V2zm-3 16.5h-2v-2H7v2H5v-7.31L6.89 5.5H17.1l1.9 5.69v7.31z\"/>")
      .name("GarageSharp")
  }
}

export default GarageSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
