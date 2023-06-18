import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FormatOverlineOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 3v2H5V3h14zm-7 4c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm0 11.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 9.5 12 9.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z\"/>")
      .name("FormatOverlineOutlined")
  }
}

export default FormatOverlineOutlined as any as Typed<DLightIconType>
