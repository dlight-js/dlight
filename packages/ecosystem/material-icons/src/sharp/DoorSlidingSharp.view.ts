import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DoorSlidingSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 19V3h-7.25v16h-1.5V3H4v16H3v2h18v-2h-1zm-10-6H8v-2h2v2zm6 0h-2v-2h2v2z\"/>")
      .name("DoorSlidingSharp")
  }
}

export default DoorSlidingSharp as any as Typed<DLightIconType>
