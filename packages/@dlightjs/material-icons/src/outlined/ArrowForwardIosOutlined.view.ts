import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowForwardIosOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z\"/>")
      .name("ArrowForwardIosOutlined")
  }
}

export default ArrowForwardIosOutlined as any as Typed<DLightIconType>
