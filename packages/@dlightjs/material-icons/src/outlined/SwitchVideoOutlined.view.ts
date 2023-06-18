import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SwitchVideoOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 13h4v2l3-3-3-3v2H8V9l-3 3 3 3zm10-3.5V6c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-3.5l4 4v-13l-4 4zM16 17H4V7h12v10z\"/>")
      .name("SwitchVideoOutlined")
  }
}

export default SwitchVideoOutlined as any as Typed<DLightIconType>
