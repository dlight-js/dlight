import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FlashlightOffFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 5V2H6v1.17L7.83 5zm-2 6 2-3V7H9.83L16 13.17zM2.81 2.81 1.39 4.22 8 10.83V22h8v-3.17l3.78 3.78 1.41-1.41L2.81 2.81z\"/>")
      .name("FlashlightOffFilled")
  }
}

export default FlashlightOffFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
