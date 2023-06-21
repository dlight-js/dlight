import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class KitchenFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 9V4c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v5h16zM8 5h2v3H8V5zm-4 6v9c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-9H4zm6 6H8v-5h2v5z\"/>")
      .name("KitchenFilled")
  }
}

export default KitchenFilled as any as Typed<DLightIconType>
