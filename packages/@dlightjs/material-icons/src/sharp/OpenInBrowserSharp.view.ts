import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class OpenInBrowserSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 4v16h6v-2H5V8h14v10h-4v2h6V4H3zm9 6-4 4h3v6h2v-6h3l-4-4z\"/>")
      .name("OpenInBrowserSharp")
  }
}

export default OpenInBrowserSharp as any as Typed<DLightIconType>
