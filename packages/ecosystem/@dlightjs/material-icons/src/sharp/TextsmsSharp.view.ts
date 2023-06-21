import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TextsmsSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2H2.01L2 22l4-4h16V2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z\"/>")
      .name("TextsmsSharp")
  }
}

export default TextsmsSharp as any as Typed<DLightIconType>
