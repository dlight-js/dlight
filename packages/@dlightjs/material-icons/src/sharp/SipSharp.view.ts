import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SipSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.5 10.5h2v1h-2z\"/><path d=\"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-10 6.5H6.5v.75H10V15H5v-1.5h3.5v-.75H5V9h5v1.5zm3 4.5h-2V9h2v6zm6-6v4h-3.5v2H14V9h5z\"/>")
      .name("SipSharp")
  }
}

export default SipSharp as any as Typed<DLightIconType>
