import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ChevronLeftOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z\"/>")
      .name("ChevronLeftOutlined")
  }
}

export default ChevronLeftOutlined as any as Typed<DLightIconType>
