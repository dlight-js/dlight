import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class EdgesensorHighSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 7h2v7H3V7zm-3 3h2v7H0v-7zm22-3h2v7h-2V7zm-3 3h2v7h-2v-7zm-1-8H6v20h12V2zm-2 15H8V7h8v10z\"/>")
      .name("EdgesensorHighSharp")
  }
}

export default EdgesensorHighSharp as any as Typed<DLightIconType>
