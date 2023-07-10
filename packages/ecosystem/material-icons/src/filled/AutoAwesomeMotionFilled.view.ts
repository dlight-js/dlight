import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AutoAwesomeMotionFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 2H4a2 2 0 0 0-2 2v10h2V4h10V2zm4 4H8a2 2 0 0 0-2 2v10h2V8h10V6zm2 4h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2z\"/>")
      .name("AutoAwesomeMotionFilled")
  }
}

export default AutoAwesomeMotionFilled as any as Typed<DLightIconType>
