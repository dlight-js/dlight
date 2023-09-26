import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class RealEstateAgentSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M1 22h4V11H1v11zM14 1.5l-7 5V9h2l10 4v2h2V6.5l-7-5zm-.5 8.5h-1V9h1v1zm0-2h-1V7h1v1zm2 2h-1V9h1v1zm0-2h-1V7h1v1zM22 19l-8 3-7-1.98V11h1.97L17 14v2h-4l-1.76-.68-.33.94L13 17h9v2z\"/>")
      .name("RealEstateAgentSharp")
  }
}

export default RealEstateAgentSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
