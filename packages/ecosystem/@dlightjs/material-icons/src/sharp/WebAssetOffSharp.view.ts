import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WebAssetOffSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6.83 4H22v15.17l-2-2V8h-9.17l-4-4zm13.66 19.31L17.17 20H2V4.83L.69 3.51 2.1 2.1l19.8 19.8-1.41 1.41zM15.17 18l-10-10H4v10h11.17z\"/>")
      .name("WebAssetOffSharp")
  }
}

export default WebAssetOffSharp as any as Typed<DLightIconType>
