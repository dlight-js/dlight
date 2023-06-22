import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TitleTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 7h5.5v12h3V7H19V4H5z\"/>")
      .name("TitleTwoTone")
  }
}

export default TitleTwoTone as any as Typed<DLightIconType>