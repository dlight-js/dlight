import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ExpandTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 20h16v2H4v-2zM4 2h16v2H4V2zm9 7h3l-4-4-4 4h3v6H8l4 4 4-4h-3V9z\"/>")
      .name("ExpandTwoTone")
  }
}

export default ExpandTwoTone as any as Typed<DLightIconType>
