import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SouthOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m19 15-1.41-1.41L13 18.17V2h-2v16.17l-4.59-4.59L5 15l7 7 7-7z\"/>")
      .name("SouthOutlined")
  }
}

export default SouthOutlined as any as Typed<DLightIconType>
