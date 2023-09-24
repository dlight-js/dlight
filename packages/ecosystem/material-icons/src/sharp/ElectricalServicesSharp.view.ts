import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ElectricalServicesSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 13h3v2h-3zm-6-1v2h-2v4h2v2h5v-8z\"/><path d=\"M5 11h7V4H4v2h6v3H3v8h6v-2H5zm13 6h3v2h-3z\"/>")
      .name("ElectricalServicesSharp")
  }
}

export default ElectricalServicesSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
