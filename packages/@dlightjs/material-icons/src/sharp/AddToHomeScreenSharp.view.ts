import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AddToHomeScreenSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 1.01 6 1v5h2V5h10v14H8v-1H6v5h14V1.01zM10 15h2V8H5v2h3.59L3 15.59 4.41 17 10 11.41V15z\"/>")
      .name("AddToHomeScreenSharp")
  }
}

export default AddToHomeScreenSharp as any as Typed<DLightIconType>
