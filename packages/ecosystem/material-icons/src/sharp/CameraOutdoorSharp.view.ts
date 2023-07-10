import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CameraOutdoorSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 14v-2h-6v6h6v-2l2 1.06v-4.12L18 14zM12 3 4 9v12h16v-2H6v-9l6-4.5 6 4.5v1h2V9l-8-6z\"/>")
      .name("CameraOutdoorSharp")
  }
}

export default CameraOutdoorSharp as any as Typed<DLightIconType>
