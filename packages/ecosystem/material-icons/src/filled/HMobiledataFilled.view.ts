import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class HMobiledataFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 11H9V7H7v10h2v-4h6v4h2V7h-2v4z\"/>")
      .name("HMobiledataFilled")
  }
}

export default HMobiledataFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
