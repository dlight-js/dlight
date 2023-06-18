import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class KeyboardCapslockRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m12 8.41 3.89 3.89a.996.996 0 1 0 1.41-1.41L12.71 6.3a.996.996 0 0 0-1.41 0l-4.6 4.59a.996.996 0 1 0 1.41 1.41L12 8.41zM7 18h10c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1z\"/>")
      .name("KeyboardCapslockRound")
  }
}

export default KeyboardCapslockRound as any as Typed<DLightIconType>
