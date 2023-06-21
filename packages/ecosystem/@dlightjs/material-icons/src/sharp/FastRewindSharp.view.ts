import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FastRewindSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 18V6l-8.5 6 8.5 6zm.5-6 8.5 6V6l-8.5 6z\"/>")
      .name("FastRewindSharp")
  }
}

export default FastRewindSharp as any as Typed<DLightIconType>
