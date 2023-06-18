import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class KeyboardOptionKeySharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 5h6v2h-6zM9 5H3v2h4.85l6.92 12H21v-2h-5.07z\"/>")
      .name("KeyboardOptionKeySharp")
  }
}

export default KeyboardOptionKeySharp as any as Typed<DLightIconType>
