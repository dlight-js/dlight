import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ForestOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m24 18-3.86-6H22L15 2l-3 4.29L9 2 2 12h1.86L0 18h7v4h4v-4h2v4h4v-4h7zM15 5.49 18.16 10h-1.68l3.86 6h-3.62l-2.57-4H16l-2.78-3.97L15 5.49zM3.66 16l3.86-6H5.84L9 5.49 12.16 10h-1.68l3.86 6H3.66z\"/>")
      .name("ForestOutlined")
  }
}

export default ForestOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
