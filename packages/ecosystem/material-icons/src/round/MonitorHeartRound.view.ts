import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MonitorHeartRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.11 12.45 14 10.24l-3.11 6.21c-.16.34-.51.55-.89.55s-.73-.21-.89-.55L7.38 13H2v5c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-5h-6c-.38 0-.73-.21-.89-.55z\"/><path d=\"M20 4H4c-1.1 0-2 .9-2 2v5h6c.38 0 .73.21.89.55L10 13.76l3.11-6.21c.34-.68 1.45-.68 1.79 0L16.62 11H22V6c0-1.1-.9-2-2-2z\"/>")
      .name("MonitorHeartRound")
  }
}

export default MonitorHeartRound as any as Typed<DLightIconType>