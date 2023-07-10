import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DownloadForOfflineFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm-1 8V6h2v4h3l-4 4-4-4h3zm6 7H7v-2h10v2z\"/>")
      .name("DownloadForOfflineFilled")
  }
}

export default DownloadForOfflineFilled as any as Typed<DLightIconType>
