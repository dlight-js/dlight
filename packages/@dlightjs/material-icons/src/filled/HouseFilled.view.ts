import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HouseFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3l-3-2.7zm-9 .7c0-1.1.9-2 2-2s2 .9 2 2h-4z\"/>")
      .name("HouseFilled")
  }
}

export default HouseFilled as any as Typed<DLightIconType>
