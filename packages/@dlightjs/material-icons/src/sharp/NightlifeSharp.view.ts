import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NightlifeSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M1 5h14l-6 9v4h2v2H5v-2h2v-4L1 5zm9.1 4 1.4-2H4.49l1.4 2h4.21zM17 5h5v3h-3v9c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3a3 3 0 0 1 1 .17V5z\"/>")
      .name("NightlifeSharp")
  }
}

export default NightlifeSharp as any as Typed<DLightIconType>
