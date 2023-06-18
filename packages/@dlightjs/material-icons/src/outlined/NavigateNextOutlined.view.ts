import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NavigateNextOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10.02 6 8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z\"/>")
      .name("NavigateNextOutlined")
  }
}

export default NavigateNextOutlined as any as Typed<DLightIconType>
