import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DoubleArrowOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.5 5H11l5 7-5 7h4.5l5-7z\"/><path d=\"M8.5 5H4l5 7-5 7h4.5l5-7z\"/>")
      .name("DoubleArrowOutlined")
  }
}

export default DoubleArrowOutlined as any as Typed<DLightIconType>
