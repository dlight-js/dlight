import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TitleOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 4v3h5.5v12h3V7H19V4H5z\"/>")
      .name("TitleOutlined")
  }
}

export default TitleOutlined as any as Typed<DLightIconType>
