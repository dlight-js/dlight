import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class GraphicEqFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 18h2V6H7v12zm4 4h2V2h-2v20zm-8-8h2v-4H3v4zm12 4h2V6h-2v12zm4-8v4h2v-4h-2z\"/>")
      .name("GraphicEqFilled")
  }
}

export default GraphicEqFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
