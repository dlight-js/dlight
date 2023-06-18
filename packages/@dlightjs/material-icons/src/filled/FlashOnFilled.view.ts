import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
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

export default FlashOnFilled as any as Typed<DLightIconType>
