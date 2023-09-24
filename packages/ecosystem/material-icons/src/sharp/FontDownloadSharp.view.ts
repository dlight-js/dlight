import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FontDownloadSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9.93 13.5h4.14L12 7.98 9.93 13.5zM22 2H2v20h20V2zm-6.05 16.5-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z\"/>")
      .name("FontDownloadSharp")
  }
}

export default FontDownloadSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
