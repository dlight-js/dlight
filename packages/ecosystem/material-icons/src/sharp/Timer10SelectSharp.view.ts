import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Timer10SelectSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 8v8h-3V8h3m3-3H7v14h9V5zM1 8h2v11h3V5H1v3zm22 3h-6v5h4v1h-4v2h6v-5h-4v-1h4v-2z\"/>")
      .name("Timer10SelectSharp")
  }
}

export default Timer10SelectSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
