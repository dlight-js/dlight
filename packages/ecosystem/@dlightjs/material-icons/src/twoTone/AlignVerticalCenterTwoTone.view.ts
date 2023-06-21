import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AlignVerticalCenterTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 11h-5V6h-3v5h-4V3H7v8H1.84v2H7v8h3v-8h4v5h3v-5h5z\"/>")
      .name("AlignVerticalCenterTwoTone")
  }
}

export default AlignVerticalCenterTwoTone as any as Typed<DLightIconType>
