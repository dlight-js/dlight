import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CameraOutdoorOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 13c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1l2 1.06v-4.12L18 14v-1zM12 3 4 9v12h16v-2H6v-9l6-4.5 6 4.5v1h2V9l-8-6z\"/>")
      .name("CameraOutdoorOutlined")
  }
}

export default CameraOutdoorOutlined as any as Typed<DLightIconType>
