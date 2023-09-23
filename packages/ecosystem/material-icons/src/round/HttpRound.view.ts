import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HttpRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4.5 11h-2V9.75c0-.41-.34-.75-.75-.75S1 9.34 1 9.75v4.5c0 .41.34.75.75.75s.75-.34.75-.75V12.5h2v1.75c0 .41.34.75.75.75s.75-.34.75-.75v-4.5C6 9.34 5.66 9 5.25 9s-.75.34-.75.75V11zm3.25-.5h.75v3.75c0 .41.34.75.75.75s.75-.34.75-.75V10.5h.75c.41 0 .75-.34.75-.75S11.16 9 10.75 9h-3c-.41 0-.75.34-.75.75s.34.75.75.75zm5.5 0H14v3.75c0 .41.34.75.75.75s.75-.34.75-.75V10.5h.75c.41 0 .75-.34.75-.75S16.66 9 16.25 9h-3c-.41 0-.75.34-.75.75s.34.75.75.75zM21.5 9H19c-.55 0-1 .45-1 1v4.25c0 .41.34.75.75.75s.75-.34.75-.75V13h2c.83 0 1.5-.68 1.5-1.5v-1c0-.82-.67-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z\"/>")
      .name("HttpRound")
  }
}

export default HttpRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
