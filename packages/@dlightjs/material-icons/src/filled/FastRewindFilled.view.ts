import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FastRewindFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 18V6l-8.5 6 8.5 6zm.5-6 8.5 6V6l-8.5 6z\"/>")
      .name("FastRewindFilled")
  }
}

export default FastRewindFilled as any as Typed<DLightIconType>
