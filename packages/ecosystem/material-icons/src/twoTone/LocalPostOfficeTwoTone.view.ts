import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LocalPostOfficeTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m12 11 8-5H4zM4 8v10h16V8l-8 5z\" opacity=\".3\"/><path d=\"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z\"/>")
      .name("LocalPostOfficeTwoTone")
  }
}

export default LocalPostOfficeTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
