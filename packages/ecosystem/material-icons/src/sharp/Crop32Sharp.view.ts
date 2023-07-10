import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Crop32Sharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 6H3v12h18V6zm-2 10H5V8h14v8z\"/>")
      .name("Crop32Sharp")
  }
}

export default Crop32Sharp as any as Typed<DLightIconType>
