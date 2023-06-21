import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MailOutlineSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 4H2.01L2 20h20V4zm-2 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z\"/>")
      .name("MailOutlineSharp")
  }
}

export default MailOutlineSharp as any as Typed<DLightIconType>
