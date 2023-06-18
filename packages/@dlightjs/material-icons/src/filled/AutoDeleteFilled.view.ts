import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AutoDeleteFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 2h-3.5l-1-1h-5l-1 1H1v2h14zm1 7c-.7 0-1.37.1-2 .29V5H2v12c0 1.1.9 2 2 2h5.68A6.999 6.999 0 0 0 23 16c0-3.87-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z\"/><path d=\"M16.5 12H15v5l3.6 2.1.8-1.2-2.9-1.7z\"/>")
      .name("AutoDeleteFilled")
  }
}

export default AutoDeleteFilled as any as Typed<DLightIconType>
