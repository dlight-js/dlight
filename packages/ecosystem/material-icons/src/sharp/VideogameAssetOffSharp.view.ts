import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VideogameAssetOffSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20.83 18H22V6H8.83l12 12zM17.5 9c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm3.69 12.19L2.81 2.81 1.39 4.22 3.17 6H2v12h13.17l4.61 4.61 1.41-1.42zM9 13v2H7v-2H5v-2h2V9.83L10.17 13H9z\"/>")
      .name("VideogameAssetOffSharp")
  }
}

export default VideogameAssetOffSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
