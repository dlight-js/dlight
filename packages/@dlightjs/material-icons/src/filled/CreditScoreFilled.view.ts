import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CreditScoreFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h5v-2H4v-6h18V6c0-1.11-.89-2-2-2zm0 4H4V6h16v2zm-5.07 11.17-2.83-2.83-1.41 1.41L14.93 22 22 14.93l-1.41-1.41-5.66 5.65z\"/>")
      .name("CreditScoreFilled")
  }
}

export default CreditScoreFilled as any as Typed<DLightIconType>
