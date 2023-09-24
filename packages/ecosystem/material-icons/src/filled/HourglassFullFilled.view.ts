import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class HourglassFullFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z\"/>")
      .name("HourglassFullFilled")
  }
}

export default HourglassFullFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
