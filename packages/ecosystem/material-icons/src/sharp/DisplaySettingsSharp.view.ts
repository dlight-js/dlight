import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DisplaySettingsSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 3H2v16h6v2h8v-2h6V3zm-2 14H4V5h16v12z\"/><path d=\"M6 8.25h8v1.5H6zm10.5 1.5H18v-1.5h-1.5V7H15v4h1.5zm-6.5 2.5h8v1.5h-8zM7.5 15H9v-4H7.5v1.25H6v1.5h1.5z\"/>")
      .name("DisplaySettingsSharp")
  }
}

export default DisplaySettingsSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
