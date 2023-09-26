import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class StraightenSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 6H1v12h22V6zm-2 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z\"/>")
      .name("StraightenSharp")
  }
}

export default StraightenSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
