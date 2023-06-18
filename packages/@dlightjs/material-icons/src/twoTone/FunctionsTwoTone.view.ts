import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FunctionsTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 17h-7l5-5-5-5h7V4H6v2l6.5 6L6 18v2h12z\"/>")
      .name("FunctionsTwoTone")
  }
}

export default FunctionsTwoTone as any as Typed<DLightIconType>
