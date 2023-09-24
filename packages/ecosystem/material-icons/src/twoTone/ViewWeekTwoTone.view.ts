import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ViewWeekTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 18H4V6h4v12zm6 0h-4V6h4v12zm6 0h-4V6h4v12z\" opacity=\".3\"/><path d=\"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM8 18H4V6h4v12zm6 0h-4V6h4v12zm6 0h-4V6h4v12z\"/>")
      .name("ViewWeekTwoTone")
  }
}

export default ViewWeekTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
