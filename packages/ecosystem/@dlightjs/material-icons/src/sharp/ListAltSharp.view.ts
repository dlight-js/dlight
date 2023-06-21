import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ListAltSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 7h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zM3 3v18h18V3H3zm16 16H5V5h14v14z\"/>")
      .name("ListAltSharp")
  }
}

export default ListAltSharp as any as Typed<DLightIconType>
