import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FlashOffFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3.27 3 2 4.27l5 5V13h3v9l3.58-6.14L17.73 20 19 18.73 3.27 3zM17 10h-4l4-8H7v2.18l8.46 8.46L17 10z\"/>")
      .name("FlashOffFilled")
  }
}

export default FlashOffFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
