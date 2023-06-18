import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class StarPurple500Filled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m12 8.89.94 3.11h2.82l-2.27 1.62.93 3.01L12 14.79l-2.42 1.84.93-3.01L8.24 12h2.82L12 8.89M12 2l-2.42 8H2l6.17 4.41L5.83 22 12 17.31 18.18 22l-2.35-7.59L22 10h-7.58L12 2z\"/>")
      .name("StarPurple500Filled")
  }
}

export default StarPurple500Filled as any as Typed<DLightIconType>
