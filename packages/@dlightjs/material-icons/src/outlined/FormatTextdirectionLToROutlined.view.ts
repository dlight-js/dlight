import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FormatTextdirectionLToROutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 4v4c-1.1 0-2-.9-2-2s.9-2 2-2m8-2H9C6.79 2 5 3.79 5 6s1.79 4 4 4v5h2V4h2v11h2V4h2V2zm0 12v3H5v2h12v3l4-4-4-4z\"/>")
      .name("FormatTextdirectionLToROutlined")
  }
}

export default FormatTextdirectionLToROutlined as any as Typed<DLightIconType>
