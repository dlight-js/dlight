import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ShopSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 6V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H2v15h20V6h-6zm-6-2h4v2h-4V4zM9 18V9l7.5 4L9 18z\"/>")
      .name("ShopSharp")
  }
}

export default ShopSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
