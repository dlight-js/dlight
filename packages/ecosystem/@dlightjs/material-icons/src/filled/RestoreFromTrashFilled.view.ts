import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class RestoreFromTrashFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 4h-3.5l-1-1h-5l-1 1H5v2h14zM6 7v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm8 7v4h-4v-4H8l4-4 4 4h-2z\"/>")
      .name("RestoreFromTrashFilled")
  }
}

export default RestoreFromTrashFilled as any as Typed<DLightIconType>
