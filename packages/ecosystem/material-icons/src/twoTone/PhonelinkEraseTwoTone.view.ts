import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PhonelinkEraseTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m4 17.2 4-4 4 4 1-1-4-4 4-4-1-1-4 4-4-4-1 1 4 4-4 4zM9 23h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v3h2V4h10v16H9v-2H7v3c0 1.1.9 2 2 2z\"/>")
      .name("PhonelinkEraseTwoTone")
  }
}

export default PhonelinkEraseTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
