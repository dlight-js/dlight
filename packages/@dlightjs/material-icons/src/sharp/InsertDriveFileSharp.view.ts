import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class InsertDriveFileSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4.01 2 4 22h16V8l-6-6H4.01zM13 9V3.5L18.5 9H13z\"/>")
      .name("InsertDriveFileSharp")
  }
}

export default InsertDriveFileSharp as any as Typed<DLightIconType>
