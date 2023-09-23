import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LabelImportantTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 7H7.89l3.57 5-3.57 5H15l3.55-5z\" opacity=\".3\"/><path d=\"M16.63 5.84C16.27 5.33 15.67 5 15 5H4l5 7-5 6.99h11c.67 0 1.27-.32 1.63-.83L21 12l-4.37-6.16zM15 17H7.89l3.57-5-3.57-5H15l3.55 5L15 17z\"/>")
      .name("LabelImportantTwoTone")
  }
}

export default LabelImportantTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
