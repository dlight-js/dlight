import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class InsertCommentTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 16h14.83L20 17.17V4H4v12zM6 6h12v2H6V6zm0 3h12v2H6V9zm0 3h12v2H6v-2z\" opacity=\".3\"/><path d=\"M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm0 2v13.17L18.83 16H4V4h16zM6 12h12v2H6zm0-3h12v2H6zm0-3h12v2H6z\"/>")
      .name("InsertCommentTwoTone")
  }
}

export default InsertCommentTwoTone as any as Typed<DLightIconType>