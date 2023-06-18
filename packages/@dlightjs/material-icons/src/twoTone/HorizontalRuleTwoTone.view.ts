import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HorizontalRuleTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path fill-rule=\"evenodd\" d=\"M4 11h16v2H4z\"/>")
      .name("HorizontalRuleTwoTone")
  }
}

export default HorizontalRuleTwoTone as any as Typed<DLightIconType>
