import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ForwardToInboxTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 18H4V8l8 5 8-5v5h-2c-2.76 0-5 2.24-5 5zm-1-7L4 6h16l-8 5z\" opacity=\".3\"/><path d=\"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9v-2H4V8l8 5 8-5v5h2V6c0-1.1-.9-2-2-2zm-8 7L4 6h16l-8 5zm7 4 4 4-4 4v-3h-4v-2h4v-3z\"/>")
      .name("ForwardToInboxTwoTone")
  }
}

export default ForwardToInboxTwoTone as any as Typed<DLightIconType>
