import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LocalParkingSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z\"/>")
      .name("LocalParkingSharp")
  }
}

export default LocalParkingSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
