import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BlindsClosedTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 5h8v2H6zm0 4h8v2H6zm10 8h2v2h-2zM6 13h8v2H6zm0 4h8v2H6zm10-4h2v2h-2zm0-8h2v2h-2zm0 4h2v2h-2z\" opacity=\".3\"/><path d=\"M20 19V3H4v16H2v2h11.25c0 .97.78 1.75 1.75 1.75s1.75-.78 1.75-1.75H22v-2h-2zm-6 0H6v-2h8v2zm0-4H6v-2h8v2zm0-4H6V9h8v2zm0-4H6V5h8v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2z\"/>")
      .name("BlindsClosedTwoTone")
  }
}

export default BlindsClosedTwoTone as any as Typed<DLightIconType>
