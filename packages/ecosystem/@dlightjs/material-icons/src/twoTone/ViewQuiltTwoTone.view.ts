import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewQuiltTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8.33 17H5V7h3.33v10zm5.34 0h-3.33v-4h3.33v4zM19 17h-3.33v-4H19v4zm0-6h-8.67V7H19v4z\" opacity=\".3\"/><path d=\"M3 5v14h18V5H3zm5.33 12H5V7h3.33v10zm5.34 0h-3.33v-4h3.33v4zM19 17h-3.33v-4H19v4zm0-6h-8.67V7H19v4z\"/>")
      .name("ViewQuiltTwoTone")
  }
}

export default ViewQuiltTwoTone as any as Typed<DLightIconType>
