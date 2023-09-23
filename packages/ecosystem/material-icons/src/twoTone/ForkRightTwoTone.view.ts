import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ForkRightTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14.59 15.59 16 17l4-4-4-4-1.41 1.41L16.17 12c-1.51-.33-3.73.08-5.17 1.36V6.83l1.59 1.59L14 7l-4-4-4 4 1.41 1.41L9 6.83V21h2v-4c.73-2.58 3.07-3.47 5.17-3l-1.58 1.59z\"/>")
      .name("ForkRightTwoTone")
  }
}

export default ForkRightTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
