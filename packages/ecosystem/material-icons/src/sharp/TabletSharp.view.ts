import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TabletSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 4H1v16h21.99L23 4zm-4 14H5V6h14v12z\"/>")
      .name("TabletSharp")
  }
}

export default TabletSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
