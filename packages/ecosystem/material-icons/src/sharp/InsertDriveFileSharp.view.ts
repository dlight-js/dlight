import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class InsertDriveFileSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4.01 2 4 22h16V8l-6-6H4.01zM13 9V3.5L18.5 9H13z\"/>")
      .name("InsertDriveFileSharp")
  }
}

export default InsertDriveFileSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
