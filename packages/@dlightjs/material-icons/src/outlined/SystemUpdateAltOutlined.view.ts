import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SystemUpdateAltOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m12 16 4-4h-3V3h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V4.99h6V3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 13 4-4h-3V3h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V4.99h6V3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z\"/>")
      .name("SystemUpdateAltOutlined")
  }
}

export default SystemUpdateAltOutlined as any as Typed<DLightIconType>
