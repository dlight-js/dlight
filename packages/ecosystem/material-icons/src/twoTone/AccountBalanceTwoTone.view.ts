import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AccountBalanceTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m6.29 6 5.21-2.74L16.71 6z\" opacity=\".3\"/><path d=\"M6.5 10h-2v7h2v-7zm6 0h-2v7h2v-7zm8.5 9H2v2h19v-2zm-2.5-9h-2v7h2v-7zm-7-9L2 6v2h19V6l-9.5-5zM6.29 6l5.21-2.74L16.71 6H6.29z\"/>")
      .name("AccountBalanceTwoTone")
  }
}

export default AccountBalanceTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
