import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WalletSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 4H2v16h20V4zm-6.25 10.09L4 11.22V10h16v.53l-4.25 3.56zM4 6h16v2H4V6z\"/>")
      .name("WalletSharp")
  }
}

export default WalletSharp as any as Typed<DLightIconType>
