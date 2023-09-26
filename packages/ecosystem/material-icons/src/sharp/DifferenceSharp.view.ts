import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DifferenceSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 23H2V7h2v14h14v2zM15 1H6.01L6 19h15V7l-6-6zm1.5 14h-6v-2h6v2zm0-6h-2v2h-2V9h-2V7h2V5h2v2h2v2z\"/>")
      .name("DifferenceSharp")
  }
}

export default DifferenceSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
