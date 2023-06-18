import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HomeSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z\"/>")
      .name("HomeSharp")
  }
}

export default HomeSharp as any as Typed<DLightIconType>
