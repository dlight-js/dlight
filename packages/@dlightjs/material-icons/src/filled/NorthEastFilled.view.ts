import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NorthEastFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z\"/>")
      .name("NorthEastFilled")
  }
}

export default NorthEastFilled as any as Typed<DLightIconType>
