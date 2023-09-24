import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FolderZipSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m12 6-2-2H2v16h20V6H12zm6 6h-2v2h2v2h-2v2h-2v-2h2v-2h-2v-2h2v-2h-2V8h2v2h2v2z\"/>")
      .name("FolderZipSharp")
  }
}

export default FolderZipSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
