import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CallMissedFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19.59 7 12 14.59 6.41 9H11V7H3v8h2v-4.59l7 7 9-9z\"/>")
      .name("CallMissedFilled")
  }
}

export default CallMissedFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
