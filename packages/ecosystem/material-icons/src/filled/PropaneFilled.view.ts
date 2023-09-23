import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PropaneFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 6h-1V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v1H7c-3.31 0-6 2.69-6 6s2.69 6 6 6v3h2v-3h6v3h2v-3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm-7-1h4v1h-4V5z\"/>")
      .name("PropaneFilled")
  }
}

export default PropaneFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
