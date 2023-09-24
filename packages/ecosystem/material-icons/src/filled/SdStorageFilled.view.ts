import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SdStorageFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 2h-8L4.02 8 4 20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 6h-2V4h2v4zm3 0h-2V4h2v4zm3 0h-2V4h2v4z\"/>")
      .name("SdStorageFilled")
  }
}

export default SdStorageFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
