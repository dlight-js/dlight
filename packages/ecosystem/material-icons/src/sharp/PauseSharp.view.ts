import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PauseSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 19h4V5H6v14zm8-14v14h4V5h-4z\"/>")
      .name("PauseSharp")
  }
}

export default PauseSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
