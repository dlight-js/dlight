import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FormatSizeFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z\"/>")
      .name("FormatSizeFilled")
  }
}

export default FormatSizeFilled as any as Typed<DLightIconType>
