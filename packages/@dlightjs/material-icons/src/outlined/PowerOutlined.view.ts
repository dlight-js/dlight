import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PowerOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 9v4.66l-3.5 3.51V19h-1v-1.83L8 13.65V9h8m0-6h-2v4h-4V3H8v4h-.01C6.9 6.99 6 7.89 6 8.98v5.52L9.5 18v3h5v-3l3.5-3.51V9c0-1.1-.9-2-2-2V3z\"/>")
      .name("PowerOutlined")
  }
}

export default PowerOutlined as any as Typed<DLightIconType>
