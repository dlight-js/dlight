import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArticleOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z\"/><path d=\"M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z\"/>")
      .name("ArticleOutlined")
  }
}

export default ArticleOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
