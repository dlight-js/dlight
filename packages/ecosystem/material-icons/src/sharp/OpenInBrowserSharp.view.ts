import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class OpenInBrowserSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 4v16h6v-2H5V8h14v10h-4v2h6V4H3zm9 6-4 4h3v6h2v-6h3l-4-4z\"/>")
      .name("OpenInBrowserSharp")
  }
}

export default OpenInBrowserSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
