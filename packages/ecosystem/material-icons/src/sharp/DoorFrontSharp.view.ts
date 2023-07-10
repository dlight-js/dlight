import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DoorFrontSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 19V3H5v16H3v2h18v-2h-2zm-4-6h-2v-2h2v2z\"/>")
      .name("DoorFrontSharp")
  }
}

export default DoorFrontSharp as any as Typed<DLightIconType>
