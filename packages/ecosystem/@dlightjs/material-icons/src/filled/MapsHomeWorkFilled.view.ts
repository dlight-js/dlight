import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MapsHomeWorkFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M1 11v10h5v-6h4v6h5V11L8 6z\"/><path d=\"M10 3v1.97l7 5V11h2v2h-2v2h2v2h-2v4h6V3H10zm9 6h-2V7h2v2z\"/>")
      .name("MapsHomeWorkFilled")
  }
}

export default MapsHomeWorkFilled as any as Typed<DLightIconType>
