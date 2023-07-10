import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CallMadeTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5.41 20 17 8.41V15h2V5H9v2h6.59L4 18.59z\"/>")
      .name("CallMadeTwoTone")
  }
}

export default CallMadeTwoTone as any as Typed<DLightIconType>
