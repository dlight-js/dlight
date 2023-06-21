import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SendToMobileOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m18 8 4 4-4 4-1.41-1.41L18.17 13H13v-2h5.17l-1.59-1.59L18 8zM7 1.01 17 1c1.1 0 2 .9 2 2v4h-2V6H7v12h10v-1h2v4c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V3c0-1.1.9-1.99 2-1.99zM7 21h10v-1H7v1zM7 4h10V3H7v1z\"/>")
      .name("SendToMobileOutlined")
  }
}

export default SendToMobileOutlined as any as Typed<DLightIconType>
