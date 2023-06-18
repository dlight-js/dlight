import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NavigateBeforeOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.61 7.41 14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z\"/>")
      .name("NavigateBeforeOutlined")
  }
}

export default NavigateBeforeOutlined as any as Typed<DLightIconType>
