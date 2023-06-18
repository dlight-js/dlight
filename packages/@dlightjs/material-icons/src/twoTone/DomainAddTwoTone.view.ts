import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DomainAddTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 9v2h2v2h-2v2h2v2h-2v2h4v-4h4V9h-8zm6 4h-2v-2h2v2z\" opacity=\".3\"/><path d=\"M12 7V3H2v18h14v-2h-4v-2h2v-2h-2v-2h2v-2h-2V9h8v6h2V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm14 12v2h-2v2h-2v-2h-2v-2h2v-2h2v2h2zm-6-8h-2v2h2v-2zm0 4h-2v2h2v-2z\"/>")
      .name("DomainAddTwoTone")
  }
}

export default DomainAddTwoTone as any as Typed<DLightIconType>
