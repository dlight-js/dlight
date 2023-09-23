import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowLeftTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m14 7-5 5 5 5V7z\"/>")
      .name("ArrowLeftTwoTone")
  }
}

export default ArrowLeftTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
