import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FolderSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 4H2v16h20V6H12l-2-2z\"/>")
      .name("FolderSharp")
  }
}

export default FolderSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
