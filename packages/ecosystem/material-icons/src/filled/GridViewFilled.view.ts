import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class GridViewFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path fill-rule=\"evenodd\" d=\"M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z\"/>")
      .name("GridViewFilled")
  }
}

export default GridViewFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
