import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class RemoveSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 13H5v-2h14v2z\"/>")
      .name("RemoveSharp")
  }
}

export default RemoveSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
