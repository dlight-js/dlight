import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AlignHorizontalCenterTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 2h2v5h8v3h-8v4h5v3h-5v5h-2v-5H6v-3h5v-4H3V7h8z\"/>")
      .name("AlignHorizontalCenterTwoTone")
  }
}

export default AlignHorizontalCenterTwoTone as any as Typed<DLightIconType>
