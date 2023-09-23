import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Icon123Sharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 15H5.5v-4.5H4V9h3v6zm6.5-1.5h-3v-1h3V9H9v1.5h3v1H9V15h4.5v-1.5zm6 1.5V9H15v1.5h3v1h-2v1h2v1h-3V15h4.5z\"/>")
      .name("Icon123Sharp")
  }
}

export default Icon123Sharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
