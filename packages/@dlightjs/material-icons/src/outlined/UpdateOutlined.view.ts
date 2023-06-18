import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class UpdateOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 8v5l4.25 2.52.77-1.28-3.52-2.09V8H11zm10 2V3l-2.64 2.64A8.937 8.937 0 0 0 12 3a9 9 0 1 0 9 9h-2c0 3.86-3.14 7-7 7s-7-3.14-7-7 3.14-7 7-7c1.93 0 3.68.79 4.95 2.05L14 10h7z\"/>")
      .name("UpdateOutlined")
  }
}

export default UpdateOutlined as any as Typed<DLightIconType>
