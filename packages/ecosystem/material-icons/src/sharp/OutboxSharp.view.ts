import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class OutboxSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 14h2v-3h3l-4-4-4 4h3z\"/><path d=\"M3 3v18h18V3H3zm16 11h-4.18c-.41 1.16-1.51 2-2.82 2s-2.4-.84-2.82-2H5V5h14v9z\"/>")
      .name("OutboxSharp")
  }
}

export default OutboxSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
