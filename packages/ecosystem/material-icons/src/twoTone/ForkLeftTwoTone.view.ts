import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ForkLeftTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9.41 15.59 8 17l-4-4 4-4 1.41 1.41L7.83 12c1.51-.33 3.73.08 5.17 1.36V6.83l-1.59 1.59L10 7l4-4 4 4-1.41 1.41L15 6.83V21h-2v-4c-.73-2.58-3.07-3.47-5.17-3l1.58 1.59z\"/>")
      .name("ForkLeftTwoTone")
  }
}

export default ForkLeftTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
