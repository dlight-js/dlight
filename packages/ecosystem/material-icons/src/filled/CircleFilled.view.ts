import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CircleFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z\"/>")
      .name("CircleFilled")
  }
}

export default CircleFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
