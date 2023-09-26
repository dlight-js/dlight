import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CallMissedSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19.59 7 12 14.59 6.41 9H11V7H3v8h2v-4.59l7 7 9-9L19.59 7z\"/>")
      .name("CallMissedSharp")
  }
}

export default CallMissedSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
