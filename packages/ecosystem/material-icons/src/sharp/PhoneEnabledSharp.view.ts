import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PhoneEnabledSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m3 15.46 5.27-.61 2.52 2.52c2.83-1.44 5.15-3.75 6.59-6.59l-2.53-2.53.61-5.25h5.51C21.55 13.18 13.18 21.55 3 20.97v-5.51z\"/>")
      .name("PhoneEnabledSharp")
  }
}

export default PhoneEnabledSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
