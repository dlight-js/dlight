import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LeaderboardTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 5h4v14h-4V5zm-6 6h4v8H4v-8zm16 8h-4v-6h4v6z\" opacity=\".3\"/><path d=\"M16 11V3H8v6H2v12h20V11h-6zm-6-6h4v14h-4V5zm-6 6h4v8H4v-8zm16 8h-4v-6h4v6z\"/>")
      .name("LeaderboardTwoTone")
  }
}

export default LeaderboardTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
