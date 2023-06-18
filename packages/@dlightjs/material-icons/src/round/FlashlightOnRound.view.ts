import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FlashlightOnRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 4v1h12V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zm0 3v1l2 3v9c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-9l2-3V7H6zm6 8.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z\"/>")
      .name("FlashlightOnRound")
  }
}

export default FlashlightOnRound as any as Typed<DLightIconType>
