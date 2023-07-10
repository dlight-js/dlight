import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PointOfSaleSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 2H5v6h14V2zm-2 4H7V4h10v2zm5 16H2v-3h20v3zM18 9H6l-4 9h20l-4-9zm-8 7H8v-1h2v1zm0-2H8v-1h2v1zm0-2H8v-1h2v1zm3 4h-2v-1h2v1zm0-2h-2v-1h2v1zm0-2h-2v-1h2v1zm3 4h-2v-1h2v1zm0-2h-2v-1h2v1zm0-2h-2v-1h2v1z\"/>")
      .name("PointOfSaleSharp")
  }
}

export default PointOfSaleSharp as any as Typed<DLightIconType>
