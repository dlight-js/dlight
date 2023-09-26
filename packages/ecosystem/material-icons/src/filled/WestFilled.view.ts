import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class WestFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m9 19 1.41-1.41L5.83 13H22v-2H5.83l4.59-4.59L9 5l-7 7 7 7z\"/>")
      .name("WestFilled")
  }
}

export default WestFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
