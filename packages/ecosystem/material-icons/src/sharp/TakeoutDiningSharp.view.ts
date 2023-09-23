import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TakeoutDiningSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m22 7.46-1.41-1.41L19 7.63l.03-.56L14.98 3H9.02L4.97 7.07l.03.5-1.59-1.56L2 7.44 4.66 10h14.69zM5.93 20h12.14l.63-8.45H5.3z\"/>")
      .name("TakeoutDiningSharp")
  }
}

export default TakeoutDiningSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
