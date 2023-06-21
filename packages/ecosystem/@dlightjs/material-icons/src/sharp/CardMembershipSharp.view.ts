import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CardMembershipSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2H2v15h6v5l4-2 4 2v-5h6V2zm-2 13H4v-2h16v2zm0-5H4V4h16v6z\"/>")
      .name("CardMembershipSharp")
  }
}

export default CardMembershipSharp as any as Typed<DLightIconType>
