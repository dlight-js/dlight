import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SquareFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3h18v18H3z\"/>")
      .name("SquareFilled")
  }
}

export default SquareFilled as any as Typed<DLightIconType>
