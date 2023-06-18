import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Inventory2TwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 7h16V3.98L4 4zm1 13h14V9H5v11zm4-8h6v2H9v-2z\" opacity=\".3\"/><path d=\"M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-1 18H5V9h14v11zm1-13H4V4l16-.02V7z\"/><path d=\"M9 12h6v2H9z\"/>")
      .name("Inventory2TwoTone")
  }
}

export default Inventory2TwoTone as any as Typed<DLightIconType>
