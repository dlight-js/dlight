import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FlashOnTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 10h-4l3-8H7v11h3v9z\"/>")
      .name("FlashOnTwoTone")
  }
}

export default FlashOnTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
