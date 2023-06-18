import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PhonelinkOffSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m4.56 4-2.5-2.49L4.56 4zM24 8h-8v4.61l2 2V10h4v7h-1.61l3 3H24zm-2-2V4H7.39l2 2zM2.06 1.51.65 2.92 2 4.27V17H0v3h17.73l2.35 2.35 1.41-1.41L2.06 1.51zM4 17V6.27L14.73 17H4z\"/>")
      .name("PhonelinkOffSharp")
  }
}

export default PhonelinkOffSharp as any as Typed<DLightIconType>
