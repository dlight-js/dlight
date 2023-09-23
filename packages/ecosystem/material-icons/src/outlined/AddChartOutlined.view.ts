import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AddChartOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 19H5V5h9V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9z\"/><path d=\"M15 13h2v4h-2zm-8-3h2v7H7zm4-3h2v10h-2zm8-2V3h-2v2h-2v2h2v2h2V7h2V5z\"/>")
      .name("AddChartOutlined")
  }
}

export default AddChartOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
