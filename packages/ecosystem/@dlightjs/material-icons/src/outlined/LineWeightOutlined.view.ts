import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LineWeightOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z\"/>")
      .name("LineWeightOutlined")
  }
}

export default LineWeightOutlined as any as Typed<DLightIconType>
