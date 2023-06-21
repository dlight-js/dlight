import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MailRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25-6.54 4.09c-.65.41-1.47.41-2.12 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44z\"/>")
      .name("MailRound")
  }
}

export default MailRound as any as Typed<DLightIconType>
