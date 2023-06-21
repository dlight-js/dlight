import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TabletAndroidSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 0H3v24h18V0zm-7 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z\"/>")
      .name("TabletAndroidSharp")
  }
}

export default TabletAndroidSharp as any as Typed<DLightIconType>
