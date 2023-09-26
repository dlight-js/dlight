import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Crop75Sharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 5H3v14h18V5zm-2 12H5V7h14v10z\"/>")
      .name("Crop75Sharp")
  }
}

export default Crop75Sharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
