import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FormatQuoteFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z\"/>")
      .name("FormatQuoteFilled")
  }
}

export default FormatQuoteFilled as any as Typed<DLightIconType>
