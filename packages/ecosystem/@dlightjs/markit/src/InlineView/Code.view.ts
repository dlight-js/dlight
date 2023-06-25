import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, span, type Typed } from "@dlightjs/types"
import css from "@iandx/easy-css"

const code = css`
  border-radius: 4px;
  background-color: Gainsboro;
  color: DarkOrange;
  padding: 4px;
  font-size: 95%;
`

class Code extends View {
  @Prop _$content = required

  Body() {
    span(this._$content)
      .className(code)
      .style({ fontSize: "95%" })
  }
}

export default Code as any as Typed<Code>
