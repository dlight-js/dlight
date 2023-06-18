import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AutoAwesomeMotionOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 2H4c-1.1 0-2 .9-2 2v10h2V4h10V2zm4 4H8c-1.1 0-2 .9-2 2v10h2V8h10V6zm2 4h-8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10h-8v-8h8v8z\"/>")
      .name("AutoAwesomeMotionOutlined")
  }
}

export default AutoAwesomeMotionOutlined as any as Typed<DLightIconType>
