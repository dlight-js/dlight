import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SortFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z\"/>")
      .name("SortFilled")
  }
}

export default SortFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
