import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CallReceivedTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 17H8.41L20 5.41 18.59 4 7 15.59V9H5v10h10z\"/>")
      .name("CallReceivedTwoTone")
  }
}

export default CallReceivedTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
