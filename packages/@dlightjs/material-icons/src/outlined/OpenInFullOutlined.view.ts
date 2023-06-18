import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class OpenInFullOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z\"/>")
      .name("OpenInFullOutlined")
  }
}

export default OpenInFullOutlined as any as Typed<DLightIconType>
