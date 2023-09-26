import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FilterListFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z\"/>")
      .name("FilterListFilled")
  }
}

export default FilterListFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
