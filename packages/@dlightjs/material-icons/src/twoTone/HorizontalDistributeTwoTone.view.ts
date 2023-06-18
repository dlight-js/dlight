import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HorizontalDistributeTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 22H2V2h2v20zM22 2h-2v20h2V2zm-8.5 5h-3v10h3V7z\"/>")
      .name("HorizontalDistributeTwoTone")
  }
}

export default HorizontalDistributeTwoTone as any as Typed<DLightIconType>
