import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FilterBAndWSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3H3v18h18V3zm-2 16-7-8v8H5l7-8V5h7v14z\"/>")
      .name("FilterBAndWSharp")
  }
}

export default FilterBAndWSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
