import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class QueueSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 6H2v16h16v-2H4V6zm18-4H6v16h16V2zm-3 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z\"/>")
      .name("QueueSharp")
  }
}

export default QueueSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
