import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class InventorySharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 5h2v3h10V5h2v5h2V3h-6.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H3v18h8v-2H5V5zm7-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z\"/><path d=\"M21 11.5 15.51 17l-3.01-3-1.5 1.5 4.51 4.5 6.99-7z\"/>")
      .name("InventorySharp")
  }
}

export default InventorySharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
