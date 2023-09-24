import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TableViewSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 7H7v14h14V7zm-2 2v2H9V9h10zm-6 6v-2h2v2h-2zm2 2v2h-2v-2h2zm-4-2H9v-2h2v2zm6-2h2v2h-2v-2zm-8 4h2v2H9v-2zm8 2v-2h2v2h-2zM6 17H3V3h14v3h-2V5H5v10h1v2z\"/>")
      .name("TableViewSharp")
  }
}

export default TableViewSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
