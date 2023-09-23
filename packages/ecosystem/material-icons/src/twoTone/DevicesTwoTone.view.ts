import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DevicesTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 10h4v7h-4z\" opacity=\".3\"/><path d=\"M23 8h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7zM4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6z\"/>")
      .name("DevicesTwoTone")
  }
}

export default DevicesTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
