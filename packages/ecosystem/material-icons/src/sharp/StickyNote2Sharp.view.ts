import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class StickyNote2Sharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2.99 3 3 21h12l6-6V3H2.99zM7 8h10v2H7V8zm5 6H7v-2h5v2zm2 5.5V14h5.5L14 19.5z\"/>")
      .name("StickyNote2Sharp")
  }
}

export default StickyNote2Sharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
