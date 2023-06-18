import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FilterBAndWSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3H3v18h18V3zm-2 16-7-8v8H5l7-8V5h7v14z\"/>")
      .name("FilterBAndWSharp")
  }
}

export default FilterBAndWSharp as any as Typed<DLightIconType>
