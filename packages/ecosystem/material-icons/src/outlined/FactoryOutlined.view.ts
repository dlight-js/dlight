import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FactoryOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 22H2V10l7-3v2l5-2v3h3l1-8h3l1 8v12zM12 9.95l-5 2V10l-3 1.32V20h16v-8h-8V9.95zM11 18h2v-4h-2v4zm-4 0h2v-4H7v4zm10-4h-2v4h2v-4z\"/>")
      .name("FactoryOutlined")
  }
}

export default FactoryOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
