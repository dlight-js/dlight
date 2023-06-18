import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class StickyNote2Outlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 5v9h-5v5H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10l6-6V5c0-1.1-.9-2-2-2zm-7 11H7v-2h5v2zm5-4H7V8h10v2z\"/>")
      .name("StickyNote2Outlined")
  }
}

export default StickyNote2Outlined as any as Typed<DLightIconType>
