import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MedicationOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10.5 15H8v-3h2.5V9.5h3V12H16v3h-2.5v2.5h-3V15zM19 8v11c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2zm-2 0H7v11h10V8zm1-5H6v2h12V3z\"/>")
      .name("MedicationOutlined")
  }
}

export default MedicationOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
