import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TransitEnterexitTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.98 6 9 12.77V8H6v10h10v-3h-4.85L18 8.03z\"/>")
      .name("TransitEnterexitTwoTone")
  }
}

export default TransitEnterexitTwoTone as any as Typed<DLightIconType>
