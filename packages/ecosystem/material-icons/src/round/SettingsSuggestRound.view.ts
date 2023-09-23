import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SettingsSuggestRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m18.04 7.99-.63-1.4-1.4-.63a.5.5 0 0 1 0-.91l1.4-.63.63-1.4a.5.5 0 0 1 .91 0l.63 1.4 1.4.63a.5.5 0 0 1 0 .91l-1.4.63-.63 1.4c-.17.39-.73.39-.91 0zm3.24 4.73-.32-.72a.5.5 0 0 0-.91 0l-.32.72-.73.32a.5.5 0 0 0 0 .91l.72.32.32.73a.5.5 0 0 0 .91 0l.32-.72.73-.32a.5.5 0 0 0 0-.91l-.72-.33zm-5.04 1.65 1.23.93c.4.3.51.86.26 1.3l-1.62 2.8c-.25.44-.79.62-1.25.42l-1.43-.6c-.2.13-.42.26-.64.37l-.19 1.54c-.06.5-.49.88-.99.88H8.38c-.5 0-.93-.38-.99-.88l-.19-1.54c-.22-.11-.43-.23-.64-.37l-1.43.6c-.46.2-1 .02-1.25-.42l-1.62-2.8c-.25-.44-.14-.99.26-1.3l1.23-.93V14c0-.12 0-.25.01-.37l-1.23-.93c-.4-.3-.51-.86-.26-1.3l1.62-2.8c.25-.44.79-.62 1.25-.42l1.43.6c.2-.13.42-.26.64-.37l.19-1.54c.05-.49.48-.87.98-.87h3.23c.5 0 .93.38.99.88l.19 1.54c.22.11.43.23.64.37l1.43-.6c.46-.2 1-.02 1.25.42l1.62 2.8c.25.44.14.99-.26 1.3l-1.23.93c.01.12.01.24.01.37s0 .24-.01.36zM13 14c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3z\"/>")
      .name("SettingsSuggestRound")
  }
}

export default SettingsSuggestRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
