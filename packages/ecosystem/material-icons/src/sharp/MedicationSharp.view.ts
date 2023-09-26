import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MedicationSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 3h12v2H6zm13 3H5v15h14V6zm-3 9h-2.5v2.5h-3V15H8v-3h2.5V9.5h3V12H16v3z\"/>")
      .name("MedicationSharp")
  }
}

export default MedicationSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
