import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ResetTvSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 10h-9.01V7L9 11l3.99 4v-3H20v5H4V5h16v3h2V3H2v16h6v2h8v-2h6z\"/>")
      .name("ResetTvSharp")
  }
}

export default ResetTvSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
