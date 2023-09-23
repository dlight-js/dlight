import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PhoneForwardedSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m18 11 5-5-5-5v3h-4v4h4zm-4.79 6.37a15.045 15.045 0 0 1-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97v-5.51l-5.27-.61-2.52 2.52z\"/>")
      .name("PhoneForwardedSharp")
  }
}

export default PhoneForwardedSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
