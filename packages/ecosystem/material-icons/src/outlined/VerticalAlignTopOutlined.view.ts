import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VerticalAlignTopOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z\"/>")
      .name("VerticalAlignTopOutlined")
  }
}

export default VerticalAlignTopOutlined as any as Typed<DLightIconType>
