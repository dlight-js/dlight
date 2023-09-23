import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HomeFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z\"/>")
      .name("HomeFilled")
  }
}

export default HomeFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
