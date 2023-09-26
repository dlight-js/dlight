import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CameraOutdoorSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 14v-2h-6v6h6v-2l2 1.06v-4.12L18 14zM12 3 4 9v12h16v-2H6v-9l6-4.5 6 4.5v1h2V9l-8-6z\"/>")
      .name("CameraOutdoorSharp")
  }
}

export default CameraOutdoorSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
