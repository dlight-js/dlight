import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewColumnFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14.67 5v14H9.33V5h5.34zm1 14H21V5h-5.33v14zm-7.34 0V5H3v14h5.33z\"/>")
      .name("ViewColumnFilled")
  }
}

export default ViewColumnFilled as any as Typed<DLightIconType>
