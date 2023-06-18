import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PunchClockOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 6h-1V1H6v5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 3h8v3H8V3zm11 17H5V8h14v12z\"/><path d=\"M12 9c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z\"/><path d=\"M12.5 11.5h-1v2.71l1.64 1.64.71-.71-1.35-1.35z\"/>")
      .name("PunchClockOutlined")
  }
}

export default PunchClockOutlined as any as Typed<DLightIconType>
