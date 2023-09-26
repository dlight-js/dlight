import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class RemoveRoadSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 4h2v9h-2zM4 4h2v16H4zm7 0h2v4h-2zm0 6h2v4h-2zm0 6h2v4h-2zm11.5.41L21.09 15 19 17.09 16.91 15l-1.41 1.41 2.09 2.09-2.09 2.09L16.91 22 19 19.91 21.09 22l1.41-1.41-2.09-2.09z\"/>")
      .name("RemoveRoadSharp")
  }
}

export default RemoveRoadSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
