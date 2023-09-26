import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AccountTreeTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3h7zM7 9H4V5h3v4zm10 6h3v4h-3v-4zm0-10h3v4h-3V5z\"/><path d=\"M7 5v4H4V5h3m13 0v4h-3V5h3m0 10v4h-3v-4h3\" opacity=\".3\"/>")
      .name("AccountTreeTwoTone")
  }
}

export default AccountTreeTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
