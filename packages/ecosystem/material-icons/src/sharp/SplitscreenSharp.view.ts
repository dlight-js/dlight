import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SplitscreenSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 4v5H6V4h12m2-2H4v9h16V2zm-2 13v5H6v-5h12m2-2H4v9h16v-9z\"/>")
      .name("SplitscreenSharp")
  }
}

export default SplitscreenSharp as any as Typed<DLightIconType>
