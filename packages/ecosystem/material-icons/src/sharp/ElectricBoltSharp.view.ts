import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ElectricBoltSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 2 2.5 13 13 14l-5 7 1 1 12.5-11L11 10l5-7z\"/>")
      .name("ElectricBoltSharp")
  }
}

export default ElectricBoltSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
