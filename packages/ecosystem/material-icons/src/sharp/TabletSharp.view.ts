import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TabletSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 4H1v16h21.99L23 4zm-4 14H5V6h14v12z\"/>")
      .name("TabletSharp")
  }
}

export default TabletSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
