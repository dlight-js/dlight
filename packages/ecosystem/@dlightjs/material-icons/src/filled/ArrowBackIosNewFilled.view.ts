import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowBackIosNewFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z\"/>")
      .name("ArrowBackIosNewFilled")
  }
}

export default ArrowBackIosNewFilled as any as Typed<DLightIconType>