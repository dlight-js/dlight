import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class KeyboardAltSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 4H1v17h22V4zM7 12v2H5v-2h2zm-2-2V8h2v2H5zm6 2v2H9v-2h2zm-2-2V8h2v2H9zm7 6v1H8v-1h8zm-1-4v2h-2v-2h2zm-2-2V8h2v2h-2zm4 4v-2h2v2h-2zm2-4h-2V8h2v2z\"/>")
      .name("KeyboardAltSharp")
  }
}

export default KeyboardAltSharp as any as Typed<DLightIconType>
