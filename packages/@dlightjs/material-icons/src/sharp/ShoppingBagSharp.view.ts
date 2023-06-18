import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ShoppingBagSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 6h-4c0-2.21-1.79-4-4-4S8 3.79 8 6H4v16h16V6zm-10 5H8V8h2v3zm2-7c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm4 7h-2V8h2v3z\"/>")
      .name("ShoppingBagSharp")
  }
}

export default ShoppingBagSharp as any as Typed<DLightIconType>
