import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HdrOnSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 12.9V9h-5v6h1.5v-2h1.1l.9 2H21l-.9-2.1h.9zm-1.5-1.4h-2v-1h2v1zm-13-.5h-2V9H3v6h1.5v-2.5h2V15H8V9H6.5v2zM13 9H9.5v6H13c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zm0 4.5h-2v-3h2v3z\"/>")
      .name("HdrOnSharp")
  }
}

export default HdrOnSharp as any as Typed<DLightIconType>