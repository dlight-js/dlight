import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PhoneCallbackSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m15.73 14.85-2.52 2.52a15.045 15.045 0 0 1-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97v-5.51l-5.27-.61zM18 9h-2.59l5.02-5.02-1.41-1.41L14 7.59V5h-2v6h6z\"/>")
      .name("PhoneCallbackSharp")
  }
}

export default PhoneCallbackSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
