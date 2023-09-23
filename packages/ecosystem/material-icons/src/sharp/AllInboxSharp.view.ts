import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AllInboxSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3H3v11h18V3zm-2 6h-4c0 1.62-1.38 3-3 3s-3-1.38-3-3H5V5h14v4zm-4 7h6v5H3v-5h6c0 1.66 1.34 3 3 3s3-1.34 3-3z\"/>")
      .name("AllInboxSharp")
  }
}

export default AllInboxSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
