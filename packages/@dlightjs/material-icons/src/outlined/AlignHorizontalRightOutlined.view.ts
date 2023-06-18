import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AlignHorizontalRightOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 2h2v20h-2V2zM2 10h16V7H2v3zm6 7h10v-3H8v3z\"/>")
      .name("AlignHorizontalRightOutlined")
  }
}

export default AlignHorizontalRightOutlined as any as Typed<DLightIconType>
