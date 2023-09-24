import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TableRestaurantSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m22.33 11-2-7H3.67l-2 7H5.2L4 20h2l.67-5h10.67l.66 5h2l-1.2-9h3.53zm-15.4 2 .27-2h9.6l.27 2H6.93z\"/>")
      .name("TableRestaurantSharp")
  }
}

export default TableRestaurantSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
