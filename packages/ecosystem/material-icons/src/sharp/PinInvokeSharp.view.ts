import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PinInvokeSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 12v8H2V4h12v2H4v12h16v-6h2zm0-5c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm-10.53 5.12-2.83 2.83 1.41 1.41 2.83-2.83L15 15.66V10H9.34l2.13 2.12z\"/>")
      .name("PinInvokeSharp")
  }
}

export default PinInvokeSharp as any as Typed<DLightIconType>
