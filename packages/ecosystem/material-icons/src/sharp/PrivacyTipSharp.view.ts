import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PrivacyTipSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z\"/>")
      .name("PrivacyTipSharp")
  }
}

export default PrivacyTipSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
