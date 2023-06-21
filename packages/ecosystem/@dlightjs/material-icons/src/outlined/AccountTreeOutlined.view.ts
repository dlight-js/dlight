import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AccountTreeOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3h7zM7 9H4V5h3v4zm10 6h3v4h-3v-4zm0-10h3v4h-3V5z\"/>")
      .name("AccountTreeOutlined")
  }
}

export default AccountTreeOutlined as any as Typed<DLightIconType>
