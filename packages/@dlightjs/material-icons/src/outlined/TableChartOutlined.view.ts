import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TableChartOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v3H5V5h15zm-5 14h-5v-9h5v9zM5 10h3v9H5v-9zm12 9v-9h3v9h-3z\"/>")
      .name("TableChartOutlined")
  }
}

export default TableChartOutlined as any as Typed<DLightIconType>
