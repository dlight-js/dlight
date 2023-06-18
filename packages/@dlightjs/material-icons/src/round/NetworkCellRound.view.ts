import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NetworkCellRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4.41 22H21c.55 0 1-.45 1-1V4.41c0-.89-1.08-1.34-1.71-.71L3.71 20.29c-.63.63-.19 1.71.7 1.71zM20 20h-3V9.83l3-3V20z\"/>")
      .name("NetworkCellRound")
  }
}

export default NetworkCellRound as any as Typed<DLightIconType>
