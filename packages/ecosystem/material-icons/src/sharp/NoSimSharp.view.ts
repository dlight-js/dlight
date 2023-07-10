import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NoSimSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3.79 3.74 2.38 5.15l2.74 2.74-.12.12V21h13.27l1.58 1.62 1.41-1.41zM19 16.11V3h-8.99L7.95 5.06z\"/>")
      .name("NoSimSharp")
  }
}

export default NoSimSharp as any as Typed<DLightIconType>
