import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DoorFrontTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 19h10V5H7v14zm6-8h2v2h-2v-2z\" opacity=\".3\"/><path d=\"M13 11h2v2h-2z\"/><path d=\"M19 19V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v14H3v2h18v-2h-2zm-2 0H7V5h10v14z\"/>")
      .name("DoorFrontTwoTone")
  }
}

export default DoorFrontTwoTone as any as Typed<DLightIconType>
