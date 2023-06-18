import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WarehouseFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 21V7L12 3 2 7v14h5v-9h10v9h5zm-11-2H9v2h2v-2zm2-3h-2v2h2v-2zm2 3h-2v2h2v-2z\"/>")
      .name("WarehouseFilled")
  }
}

export default WarehouseFilled as any as Typed<DLightIconType>
