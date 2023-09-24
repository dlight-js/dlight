import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PlusOneFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 8H8v4H4v2h4v4h2v-4h4v-2h-4zm4.5-1.92V7.9l2.5-.5V18h2V5z\"/>")
      .name("PlusOneFilled")
  }
}

export default PlusOneFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
