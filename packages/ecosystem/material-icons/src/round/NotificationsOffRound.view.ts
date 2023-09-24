import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NotificationsOffRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68c-.24.06-.47.15-.69.23L18 13.1V11zM5.41 3.35 4 4.76l2.81 2.81C6.29 8.57 6 9.73 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h12.83l1.74 1.74 1.41-1.41L5.41 3.35z\"/>")
      .name("NotificationsOffRound")
  }
}

export default NotificationsOffRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
