import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SkipPreviousOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 6h2v12H6zm3.5 6 8.5 6V6l-8.5 6zm6.5 2.14L12.97 12 16 9.86v4.28z\"/>")
      .name("SkipPreviousOutlined")
  }
}

export default SkipPreviousOutlined as any as Typed<DLightIconType>
