import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PentagonRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m2.47 10.42 3.07 9.22c.28.81 1.04 1.36 1.9 1.36h9.12a2 2 0 0 0 1.9-1.37l3.07-9.22c.28-.84-.03-1.76-.75-2.27L13.15 2.8a2 2 0 0 0-2.29 0L3.22 8.14c-.72.51-1.03 1.44-.75 2.28z\"/>")
      .name("PentagonRound")
  }
}

export default PentagonRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
