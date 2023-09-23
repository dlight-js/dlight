import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BrowserUpdatedOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 13v3c0 1.1-.9 2-2 2h-3l1 1v2H6v-2l1-1H4c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h8v2H4v11h16v-3h2zm-7 2-5-5 1.41-1.41L14 11.17V3h2v8.17l2.59-2.58L20 10l-5 5z\"/>")
      .name("BrowserUpdatedOutlined")
  }
}

export default BrowserUpdatedOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
