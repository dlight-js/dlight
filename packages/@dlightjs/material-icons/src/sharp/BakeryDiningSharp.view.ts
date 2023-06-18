import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BakeryDiningSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m16.36 7.58-.86 9.41H17l3.16-7.89zM3.84 9.1 7 16.99h1.5l-.86-9.41zM10 16.99h4L15 6H9zm10.32-4.24-1.81 4.5 1.95.96 2.06-1.22zM1.48 16.99l2.06 1.22 1.95-.96-1.81-4.5z\"/>")
      .name("BakeryDiningSharp")
  }
}

export default BakeryDiningSharp as any as Typed<DLightIconType>
