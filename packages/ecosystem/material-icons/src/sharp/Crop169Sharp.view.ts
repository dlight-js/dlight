import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Crop169Sharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 7H3v10h18V7zm-2 8H5V9h14v6z\"/>")
      .name("Crop169Sharp")
  }
}

export default Crop169Sharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
