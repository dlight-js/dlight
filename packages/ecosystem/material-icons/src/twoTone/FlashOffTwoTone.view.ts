import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FlashOffTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 10h-3.61l2.28 2.28zm0-8H7v1.61l6.13 6.13zm-13.59.86L2 4.27l5 5V13h3v9l3.58-6.15L17.73 20l1.41-1.41z\"/>")
      .name("FlashOffTwoTone")
  }
}

export default FlashOffTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
