import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PhoneAndroidTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 4h10v14H7z\" opacity=\".3\"/><path d=\"M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3-3H7V4h10v14z\"/>")
      .name("PhoneAndroidTwoTone")
  }
}

export default PhoneAndroidTwoTone as any as Typed<DLightIconType>
