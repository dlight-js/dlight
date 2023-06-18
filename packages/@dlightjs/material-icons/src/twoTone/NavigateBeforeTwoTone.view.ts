import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NavigateBeforeTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m14.2 6-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z\"/>")
      .name("NavigateBeforeTwoTone")
  }
}

export default NavigateBeforeTwoTone as any as Typed<DLightIconType>
