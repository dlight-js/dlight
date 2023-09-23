import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BorderColorSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 24H2v-4h20v4zM13.06 5.19l3.75 3.75L7.75 18H4v-3.75l9.06-9.06zm4.82 2.68-3.75-3.75 2.53-2.54 3.75 3.75-2.53 2.54z\"/>")
      .name("BorderColorSharp")
  }
}

export default BorderColorSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
