import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DoorBackSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 19V3H5v16H3v2h18v-2h-2zm-8-6H9v-2h2v2z\"/>")
      .name("DoorBackSharp")
  }
}

export default DoorBackSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
