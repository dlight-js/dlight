import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NorthWestSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 15h2V8.41L18.59 20 20 18.59 8.41 7H15V5H5v10z\"/>")
      .name("NorthWestSharp")
  }
}

export default NorthWestSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
