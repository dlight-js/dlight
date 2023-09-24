import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FilterAltOffFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19.79 5.61A.998.998 0 0 0 19 4H6.83l7.97 7.97 4.99-6.36zM2.81 2.81 1.39 4.22 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.17l5.78 5.78 1.41-1.41L2.81 2.81z\"/>")
      .name("FilterAltOffFilled")
  }
}

export default FilterAltOffFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
