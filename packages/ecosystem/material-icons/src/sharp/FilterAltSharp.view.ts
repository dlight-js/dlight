import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FilterAltSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 4c2.01 2.59 7 9 7 9v7h4v-7s4.98-6.41 7-9H3z\"/>")
      .name("FilterAltSharp")
  }
}

export default FilterAltSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
