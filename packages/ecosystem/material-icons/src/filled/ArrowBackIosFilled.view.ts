import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowBackIosFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z\"/>")
      .name("ArrowBackIosFilled")
  }
}

export default ArrowBackIosFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
