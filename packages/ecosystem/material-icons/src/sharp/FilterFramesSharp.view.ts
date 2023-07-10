import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FilterFramesSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 4h-6l-4-4-4 4H2v18h20V4zm-2 16H4V6h4.52l3.52-3.5L15.52 6H20v14zM18 8H6v10h12\"/>")
      .name("FilterFramesSharp")
  }
}

export default FilterFramesSharp as any as Typed<DLightIconType>
