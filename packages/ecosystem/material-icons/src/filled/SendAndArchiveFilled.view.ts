import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SendAndArchiveFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 10h-3L2 3v7l9 2-9 2v7l8-3.5V21c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2zm0 11h-9v-9h9v9zm-4.5-1L13 16h2v-3h3v3h2l-3.5 4z\"/>")
      .name("SendAndArchiveFilled")
  }
}

export default SendAndArchiveFilled as any as Typed<DLightIconType>
