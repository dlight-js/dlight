import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowForwardFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z\"/>")
      .name("ArrowForwardFilled")
  }
}

export default ArrowForwardFilled as any as Typed<DLightIconType>
