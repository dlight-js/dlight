import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class WarehouseTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 8.35V19h-2v-8H6v8H4V8.35l8-3.2 8 3.2zM22 21V7L12 3 2 7v14h6v-8h8v8h6zm-11-2H9v2h2v-2zm2-3h-2v2h2v-2zm2 3h-2v2h2v-2z\"/>")
      .name("WarehouseTwoTone")
  }
}

export default WarehouseTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
