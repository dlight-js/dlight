import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ViewStreamSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 19v-6h18v6H3zM3 5v6h18V5H3z\"/>")
      .name("ViewStreamSharp")
  }
}

export default ViewStreamSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
