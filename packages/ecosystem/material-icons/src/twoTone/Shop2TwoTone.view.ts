import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Shop2TwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 16h14V7H7v9zm5-8 5.5 3.5L12 15V8z\" opacity=\".3\"/><path d=\"M3 9H1v11c0 1.11.89 2 2 2h16v-2H3V9z\"/><path d=\"M18 5V3c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H5v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5h-5zm-6-2h4v2h-4V3zm9 13H7V7h14v9z\"/><path d=\"M12 8v7l5.5-3.5z\"/>")
      .name("Shop2TwoTone")
  }
}

export default Shop2TwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
