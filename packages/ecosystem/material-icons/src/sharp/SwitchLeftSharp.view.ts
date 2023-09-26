import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SwitchLeftSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8.5 8.62v6.76L5.12 12 8.5 8.62M10 5l-7 7 7 7V5zm4 0v14l7-7-7-7z\"/>")
      .name("SwitchLeftSharp")
  }
}

export default SwitchLeftSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
