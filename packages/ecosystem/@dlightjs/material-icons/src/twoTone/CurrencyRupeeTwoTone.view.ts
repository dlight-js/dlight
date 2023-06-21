import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CurrencyRupeeTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13.66 7c-.56-1.18-1.76-2-3.16-2H6V3h12v2h-3.26c.48.58.84 1.26 1.05 2H18v2h-2.02c-.25 2.8-2.61 5-5.48 5h-.73l6.73 7h-2.77L7 14v-2h3.5c1.76 0 3.22-1.3 3.46-3H6V7h7.66z\"/>")
      .name("CurrencyRupeeTwoTone")
  }
}

export default CurrencyRupeeTwoTone as any as Typed<DLightIconType>
