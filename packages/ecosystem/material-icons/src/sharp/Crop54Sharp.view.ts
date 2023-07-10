import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Crop54Sharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 4H3v16h18V4zm-2 14H5V6h14v12z\"/>")
      .name("Crop54Sharp")
  }
}

export default Crop54Sharp as any as Typed<DLightIconType>
