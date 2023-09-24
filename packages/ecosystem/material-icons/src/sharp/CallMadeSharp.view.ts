import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CallMadeSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z\"/>")
      .name("CallMadeSharp")
  }
}

export default CallMadeSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
