import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DetailsFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 3 2 21h20L12 3zm1 5.92L18.6 19H13V8.92zm-2 0V19H5.4L11 8.92z\"/>")
      .name("DetailsFilled")
  }
}

export default DetailsFilled as any as Typed<DLightIconType>
