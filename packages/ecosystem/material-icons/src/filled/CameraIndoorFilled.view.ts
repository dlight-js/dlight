import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CameraIndoorFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 3 4 9v12h16V9l-8-6zm4 13.06L14 15v1c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v1l2-1.06v4.12z\"/>")
      .name("CameraIndoorFilled")
  }
}

export default CameraIndoorFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
