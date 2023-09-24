import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DevicesSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 6h18V4H2v13H0v3h14v-3H4V6zm20 2h-8v12h8V8zm-2 9h-4v-7h4v7z\"/>")
      .name("DevicesSharp")
  }
}

export default DevicesSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
