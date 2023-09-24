import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class StarPurple500TwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m12 8.89.94 3.11h2.82l-2.27 1.62.93 3.01L12 14.79l-2.42 1.84.93-3.01L8.24 12h2.82L12 8.89M12 2l-2.42 8H2l6.17 4.41L5.83 22 12 17.31 18.18 22l-2.35-7.59L22 10h-7.58L12 2z\"/>")
      .name("StarPurple500TwoTone")
  }
}

export default StarPurple500TwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
