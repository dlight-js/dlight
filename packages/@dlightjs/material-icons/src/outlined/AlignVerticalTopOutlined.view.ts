import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AlignVerticalTopOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2v2H2V2h20zM7 22h3V6H7v16zm7-6h3V6h-3v10z\"/>")
      .name("AlignVerticalTopOutlined")
  }
}

export default AlignVerticalTopOutlined as any as Typed<DLightIconType>
