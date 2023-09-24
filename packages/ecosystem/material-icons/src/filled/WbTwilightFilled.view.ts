import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class WbTwilightFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m16.955 8.662 2.12-2.122 1.416 1.414-2.121 2.122zM2 18h20v2H2zm9-14h2v3h-2zM3.543 7.925 4.957 6.51l2.121 2.12-1.414 1.415zM5 16h14c0-3.87-3.13-7-7-7s-7 3.13-7 7z\"/>")
      .name("WbTwilightFilled")
  }
}

export default WbTwilightFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
