import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AirlinesOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17.34 18H5.8l8.25-12h5.54l-2.25 12zM13 4 2 20h17l3-16h-9zm1.5 5a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5z\"/>")
      .name("AirlinesOutlined")
  }
}

export default AirlinesOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
