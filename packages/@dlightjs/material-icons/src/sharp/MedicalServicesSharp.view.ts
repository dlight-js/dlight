import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MedicalServicesSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 6V2H8v4H2v16h20V6h-6zm-6-2h4v2h-4V4zm6 11h-3v3h-2v-3H8v-2h3v-3h2v3h3v2z\"/>")
      .name("MedicalServicesSharp")
  }
}

export default MedicalServicesSharp as any as Typed<DLightIconType>
