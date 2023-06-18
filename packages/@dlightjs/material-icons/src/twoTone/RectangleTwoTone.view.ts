import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class RectangleTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 6h16v12H4z\" opacity=\".3\"/><path d=\"M2 4v16h20V4H2zm18 14H4V6h16v12z\"/>")
      .name("RectangleTwoTone")
  }
}

export default RectangleTwoTone as any as Typed<DLightIconType>
