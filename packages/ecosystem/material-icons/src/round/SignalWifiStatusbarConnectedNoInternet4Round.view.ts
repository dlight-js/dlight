import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalWifiStatusbarConnectedNoInternet4Round extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22.92 8H17v7.99l-4.29 4.3c-.39.39-1.02.39-1.42 0L.73 9.71C.32 9.3.35 8.63.79 8.24 3.78 5.6 7.7 4 12 4c4.16 0 7.97 1.51 10.92 4zM20 18c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-8c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1z\"/>")
      .name("SignalWifiStatusbarConnectedNoInternet4Round")
  }
}

export default SignalWifiStatusbarConnectedNoInternet4Round as Pretty as Typed<DLightIconType, HTMLSpanElement>
