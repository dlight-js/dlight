import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ReplayTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m7 6 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8V1L7 6z\"/>")
      .name("ReplayTwoTone")
  }
}

export default ReplayTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
