import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LabelImportantSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 18.99h12.04L21 12l-4.97-7H4l5 7-5 6.99z\"/>")
      .name("LabelImportantSharp")
  }
}

export default LabelImportantSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
