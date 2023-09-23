import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class EmailTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m20 8-8 5-8-5v10h16zm0-2H4l8 4.99z\" opacity=\".3\"/><path d=\"M4 20h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2zM20 6l-8 4.99L4 6h16zM4 8l8 5 8-5v10H4V8z\"/>")
      .name("EmailTwoTone")
  }
}

export default EmailTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
