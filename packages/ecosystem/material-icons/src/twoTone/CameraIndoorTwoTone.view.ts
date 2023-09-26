import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CameraIndoorTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 10v9h12v-9l-6-4.5L6 10zm8 2v1l2-1.06v4.12L14 15v1c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h4c.55 0 1 .45 1 1z\" opacity=\".3\"/><path d=\"M8 12v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1l2 1.06v-4.12L14 13v-1c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1z\"/><path d=\"M12 3 4 9v12h16V9l-8-6zm6 16H6v-9l6-4.5 6 4.5v9z\"/>")
      .name("CameraIndoorTwoTone")
  }
}

export default CameraIndoorTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
