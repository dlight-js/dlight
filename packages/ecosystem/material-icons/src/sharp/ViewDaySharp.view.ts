import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewDaySharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 21h19v-3H2v3zM21 8H2v8h19V8zM2 3v3h19V3H2z\"/>")
      .name("ViewDaySharp")
  }
}

export default ViewDaySharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
