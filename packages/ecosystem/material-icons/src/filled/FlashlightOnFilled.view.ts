import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FlashlightOnFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 2h12v3H6zm0 5v1l2 3v11h8V11l2-3V7H6zm6 8.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z\"/>")
      .name("FlashlightOnFilled")
  }
}

export default FlashlightOnFilled as any as Typed<DLightIconType>
