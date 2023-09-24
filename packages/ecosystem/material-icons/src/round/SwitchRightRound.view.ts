import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SwitchRightRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.5 15.38V8.62L18.88 12l-3.38 3.38m4.79-2.67a.996.996 0 0 0 0-1.41L15.7 6.71c-.62-.63-1.7-.19-1.7.7v9.17c0 .89 1.08 1.34 1.71.71l4.58-4.58zM10 16.59V7.41c0-.89-1.08-1.34-1.71-.71L3.7 11.29a.996.996 0 0 0 0 1.41l4.59 4.59c.63.63 1.71.19 1.71-.7z\"/>")
      .name("SwitchRightRound")
  }
}

export default SwitchRightRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
