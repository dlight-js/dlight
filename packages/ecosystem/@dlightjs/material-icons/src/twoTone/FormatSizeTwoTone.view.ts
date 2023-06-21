import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FormatSizeTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 12h3v7h3v-7h3V9H3zm6-5h5v12h3V7h5V4H9z\"/>")
      .name("FormatSizeTwoTone")
  }
}

export default FormatSizeTwoTone as any as Typed<DLightIconType>
