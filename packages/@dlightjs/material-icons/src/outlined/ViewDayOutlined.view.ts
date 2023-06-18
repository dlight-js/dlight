import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewDayOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 18H2v2h19v-2zm-2-8v4H4v-4h15m1-2H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm1-4H2v2h19V4z\"/>")
      .name("ViewDayOutlined")
  }
}

export default ViewDayOutlined as any as Typed<DLightIconType>
