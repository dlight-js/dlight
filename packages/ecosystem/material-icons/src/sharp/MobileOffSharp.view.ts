import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MobileOffSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 5v8.61l2 2V1H5v.61L8.39 5zM2.9 2.35 1.49 3.76 5 7.27V23h14v-1.73l1.7 1.7 1.41-1.41L2.9 2.35zM7 19V9.27L16.73 19H7z\"/>")
      .name("MobileOffSharp")
  }
}

export default MobileOffSharp as any as Typed<DLightIconType>
