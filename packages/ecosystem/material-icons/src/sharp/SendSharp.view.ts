import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SendSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2.01 21 23 12 2.01 3 2 10l15 2-15 2 .01 7z\"/>")
      .name("SendSharp")
  }
}

export default SendSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
