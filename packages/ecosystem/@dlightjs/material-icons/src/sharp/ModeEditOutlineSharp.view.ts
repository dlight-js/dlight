import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ModeEditOutlineSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75-2.53 2.54 3.75 3.75 2.53-2.54z\"/>")
      .name("ModeEditOutlineSharp")
  }
}

export default ModeEditOutlineSharp as any as Typed<DLightIconType>
