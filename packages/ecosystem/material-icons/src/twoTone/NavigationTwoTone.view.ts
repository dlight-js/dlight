import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NavigationTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m7.72 17.7 3.47-1.53.81-.36.81.36 3.47 1.53L12 7.27z\" opacity=\".3\"/><path d=\"m4.5 20.29.71.71L12 18l6.79 3 .71-.71L12 2 4.5 20.29zm8.31-4.12-.81-.36-.81.36-3.47 1.53L12 7.27l4.28 10.43-3.47-1.53z\"/>")
      .name("NavigationTwoTone")
  }
}

export default NavigationTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
