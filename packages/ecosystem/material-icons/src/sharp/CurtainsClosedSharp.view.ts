import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CurtainsClosedSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 19V3H4v16H2v2h20v-2h-2zM11 5h2v14h-2V5z\"/>")
      .name("CurtainsClosedSharp")
  }
}

export default CurtainsClosedSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
