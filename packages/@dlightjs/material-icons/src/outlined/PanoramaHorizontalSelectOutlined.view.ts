import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PanoramaHorizontalSelectOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 5.5c-3.89 0-6.95-.84-8.69-1.43A.993.993 0 0 0 2 5.02V19c0 .68.66 1.17 1.31.95C5.36 19.26 8.1 18.5 12 18.5c3.87 0 6.66.76 8.69 1.45A.999.999 0 0 0 22 19V5c0-.68-.66-1.17-1.31-.95-2.03.68-4.83 1.45-8.69 1.45z\"/>")
      .name("PanoramaHorizontalSelectOutlined")
  }
}

export default PanoramaHorizontalSelectOutlined as any as Typed<DLightIconType>
