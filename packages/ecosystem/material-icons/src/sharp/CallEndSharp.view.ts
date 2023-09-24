import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CallEndSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m3.68 16.07 3.92-3.11V9.59c2.85-.93 5.94-.93 8.8 0v3.38l3.91 3.1L24 12.39c-6.41-7.19-17.59-7.19-24 0l3.68 3.68z\"/>")
      .name("CallEndSharp")
  }
}

export default CallEndSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
