import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ModeNightSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9.5 2c-1.82 0-3.53.5-5 1.35 2.99 1.73 5 4.95 5 8.65s-2.01 6.92-5 8.65c1.47.85 3.18 1.35 5 1.35 5.52 0 10-4.48 10-10S15.02 2 9.5 2z\"/>")
      .name("ModeNightSharp")
  }
}

export default ModeNightSharp as any as Typed<DLightIconType>
