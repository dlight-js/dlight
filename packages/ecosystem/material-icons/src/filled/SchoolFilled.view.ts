import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SchoolFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z\"/>")
      .name("SchoolFilled")
  }
}

export default SchoolFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
