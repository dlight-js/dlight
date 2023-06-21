import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowBackIosNewOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z\"/>")
      .name("ArrowBackIosNewOutlined")
  }
}

export default ArrowBackIosNewOutlined as any as Typed<DLightIconType>
