import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class IosShareSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 8h-5v2h3v11H6V10h3V8H4v15h16z\"/><path d=\"M11 16h2V5h3l-4-4-4 4h3z\"/>")
      .name("IosShareSharp")
  }
}

export default IosShareSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
