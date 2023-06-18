import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FlashOnOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 2v11h3v9l7-12h-4l3-8z\"/>")
      .name("FlashOnOutlined")
  }
}

export default FlashOnOutlined as any as Typed<DLightIconType>
