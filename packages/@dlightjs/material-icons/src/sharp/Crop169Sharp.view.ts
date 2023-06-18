import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Crop169Sharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 7H3v10h18V7zm-2 8H5V9h14v6z\"/>")
      .name("Crop169Sharp")
  }
}

export default Crop169Sharp as any as Typed<DLightIconType>
