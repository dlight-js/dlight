import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SendFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2.01 21 23 12 2.01 3 2 10l15 2-15 2z\"/>")
      .name("SendFilled")
  }
}

export default SendFilled as any as Typed<DLightIconType>
