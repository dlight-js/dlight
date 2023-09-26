import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MicExternalOnSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9.22 7H4.78C4.3 6.47 4 5.77 4 5c0-1.66 1.34-3 3-3s3 1.34 3 3c0 .77-.3 1.47-.78 2zM20 2v20h-2V4h-4v18H6v-4H5L4 8h6L9 18H8v2h4V2h8z\"/>")
      .name("MicExternalOnSharp")
  }
}

export default MicExternalOnSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
