import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FilterListOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z\"/>")
      .name("FilterListOutlined")
  }
}

export default FilterListOutlined as any as Typed<DLightIconType>
