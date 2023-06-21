import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SendToMobileFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 17h2v4c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V3c0-1.1.9-1.99 2-1.99L17 1c1.1 0 2 .9 2 2v4h-2V6H7v12h10v-1zm5-5-4-4v3h-5v2h5v3l4-4z\"/>")
      .name("SendToMobileFilled")
  }
}

export default SendToMobileFilled as any as Typed<DLightIconType>
