import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CasinoOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z\"/><circle cx=\"7.5\" cy=\"16.5\" r=\"1.5\"/><circle cx=\"7.5\" cy=\"7.5\" r=\"1.5\"/><circle cx=\"12\" cy=\"12\" r=\"1.5\"/><circle cx=\"16.5\" cy=\"16.5\" r=\"1.5\"/><circle cx=\"16.5\" cy=\"7.5\" r=\"1.5\"/>")
      .name("CasinoOutlined")
  }
}

export default CasinoOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
