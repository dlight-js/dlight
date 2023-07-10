import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowBackIosSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17.51 3.87 15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z\"/>")
      .name("ArrowBackIosSharp")
  }
}

export default ArrowBackIosSharp as any as Typed<DLightIconType>
