import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DataObjectSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 10H2v4h2v6h6v-2H6v-5.5H4v-1h2V6h4V4H4zm16 0V4h-6v2h4v5.5h2v1h-2V18h-4v2h6v-6h2v-4z\"/>")
      .name("DataObjectSharp")
  }
}

export default DataObjectSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
