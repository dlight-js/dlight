import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SkipPreviousFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 6h2v12H6zm3.5 6 8.5 6V6z\"/>")
      .name("SkipPreviousFilled")
  }
}

export default SkipPreviousFilled as any as Typed<DLightIconType>
