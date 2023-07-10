import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FlashlightOnOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 2H6v6l2 3v11h8V11l2-3V2zm-2 2v1H8V4h8zm-2 6.4V20h-4v-9.61l-2-3V7h8v.39l-2 3.01z\"/><circle cx=\"12\" cy=\"14\" r=\"1.5\"/>")
      .name("FlashlightOnOutlined")
  }
}

export default FlashlightOnOutlined as any as Typed<DLightIconType>
