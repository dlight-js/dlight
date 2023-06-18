import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class OfflineShareSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 5H4v18h12v-2H6z\"/><path d=\"M20 1H8v18h12V1zm-2 14h-8V5h8v10z\"/><path d=\"M12.5 10.25h2V12L17 9.5 14.5 7v1.75H11V12h1.5z\"/>")
      .name("OfflineShareSharp")
  }
}

export default OfflineShareSharp as any as Typed<DLightIconType>
