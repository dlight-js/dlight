import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VolumeMuteRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L11 9H8c-.55 0-1 .45-1 1z\"/>")
      .name("VolumeMuteRound")
  }
}

export default VolumeMuteRound as any as Typed<DLightIconType>
