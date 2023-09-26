import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MedicalServicesSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 6V2H8v4H2v16h20V6h-6zm-6-2h4v2h-4V4zm6 11h-3v3h-2v-3H8v-2h3v-3h2v3h3v2z\"/>")
      .name("MedicalServicesSharp")
  }
}

export default MedicalServicesSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
