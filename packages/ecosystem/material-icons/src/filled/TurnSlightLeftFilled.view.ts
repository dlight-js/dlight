import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TurnSlightLeftFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11.66 6V4H6v5.66h2V7.41l5 5V20h2v-7.58c0-.53-.21-1.04-.59-1.41l-5-5h2.25z\"/>")
      .name("TurnSlightLeftFilled")
  }
}

export default TurnSlightLeftFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
