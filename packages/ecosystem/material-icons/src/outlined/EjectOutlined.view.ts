import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class EjectOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 17h14v2H5zm7-12L5.33 15h13.34L12 5zm0 3.6 2.93 4.4H9.07L12 8.6z\"/>")
      .name("EjectOutlined")
  }
}

export default EjectOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
