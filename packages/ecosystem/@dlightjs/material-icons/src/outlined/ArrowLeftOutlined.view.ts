import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowLeftOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m14 7-5 5 5 5V7z\"/>")
      .name("ArrowLeftOutlined")
  }
}

export default ArrowLeftOutlined as any as Typed<DLightIconType>
