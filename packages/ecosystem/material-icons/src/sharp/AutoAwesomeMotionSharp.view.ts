import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AutoAwesomeMotionSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 2H2v12h2V4h10V2zm4 4H6v12h2V8h10V6zm4 4H10v12h12V10z\"/>")
      .name("AutoAwesomeMotionSharp")
  }
}

export default AutoAwesomeMotionSharp as any as Typed<DLightIconType>
