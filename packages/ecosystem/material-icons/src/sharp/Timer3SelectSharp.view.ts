import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Timer3SelectSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 11v2h-4v1h4v5h-6v-2h4v-1h-4v-5h6zM4 5v3h6v2.5H4v3h6V16H4v3h9V5H4z\"/>")
      .name("Timer3SelectSharp")
  }
}

export default Timer3SelectSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
