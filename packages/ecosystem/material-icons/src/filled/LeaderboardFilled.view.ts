import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LeaderboardFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z\"/>")
      .name("LeaderboardFilled")
  }
}

export default LeaderboardFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
