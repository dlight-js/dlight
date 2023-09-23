import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
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

export default TitleOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
