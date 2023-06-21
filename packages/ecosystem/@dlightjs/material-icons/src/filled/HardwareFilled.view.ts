import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HardwareFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m18 3-3 3V3H9C6.24 3 4 5.24 4 8h5v3h6V8l3 3h2V3h-2zM9 13v7c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-7H9z\"/>")
      .name("HardwareFilled")
  }
}

export default HardwareFilled as any as Typed<DLightIconType>
