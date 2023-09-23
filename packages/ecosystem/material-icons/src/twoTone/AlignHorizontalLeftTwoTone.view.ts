import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AlignHorizontalLeftTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 22H2V2h2v20zM22 7H6v3h16V7zm-6 7H6v3h10v-3z\"/>")
      .name("AlignHorizontalLeftTwoTone")
  }
}

export default AlignHorizontalLeftTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
