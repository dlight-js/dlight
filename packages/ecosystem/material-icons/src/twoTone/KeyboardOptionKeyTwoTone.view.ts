import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class KeyboardOptionKeyTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 5h6v2h-6zM9 5H3v2h4.85l6.92 12H21v-2h-5.07z\"/>")
      .name("KeyboardOptionKeyTwoTone")
  }
}

export default KeyboardOptionKeyTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
