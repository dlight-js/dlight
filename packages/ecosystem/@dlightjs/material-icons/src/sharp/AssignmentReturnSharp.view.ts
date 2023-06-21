import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AssignmentReturnSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3h-6.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H3v18h18V3zm-9 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4v3l-5-5 5-5v3h4v4z\"/>")
      .name("AssignmentReturnSharp")
  }
}

export default AssignmentReturnSharp as any as Typed<DLightIconType>
