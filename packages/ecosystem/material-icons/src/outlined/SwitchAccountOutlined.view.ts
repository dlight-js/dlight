import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SwitchAccountOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6-5H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-9.31 14a5.977 5.977 0 0 1 6.62 0h-6.62zm9.31-.27C18.53 14.06 16.4 13 14 13s-4.53 1.06-6 2.73V4h12v11.73z\"/>")
      .name("SwitchAccountOutlined")
  }
}

export default SwitchAccountOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
