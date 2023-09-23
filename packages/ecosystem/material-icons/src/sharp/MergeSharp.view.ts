import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MergeSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6.41 21 5 19.59l4.83-4.83c.75-.75 1.17-1.77 1.17-2.83v-5.1L9.41 8.41 8 7l4-4 4 4-1.41 1.41L13 6.83v5.1c0 1.06.42 2.08 1.17 2.83L19 19.59 17.59 21 12 15.41 6.41 21z\"/>")
      .name("MergeSharp")
  }
}

export default MergeSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
