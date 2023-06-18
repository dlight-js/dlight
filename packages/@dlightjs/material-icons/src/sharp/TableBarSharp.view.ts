import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TableBarSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 7.5C22 5.57 17.52 4 12 4S2 5.57 2 7.5c0 1.81 3.95 3.31 9 3.48V15H8l-2 5h2l1.2-3h5.6l1.2 3h2l-2-5h-3v-4.02c5.05-.17 9-1.67 9-3.48z\"/>")
      .name("TableBarSharp")
  }
}

export default TableBarSharp as any as Typed<DLightIconType>
