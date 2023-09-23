import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FlashOnFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 2v11h3v9l7-12h-4l4-8z\"/>")
      .name("FlashOnFilled")
  }
}

export default FlashOnFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
