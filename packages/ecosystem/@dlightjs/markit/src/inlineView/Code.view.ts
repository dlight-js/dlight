import DLight, { View } from "@dlightjs/dlight"
import { Prop, required, span, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

class Code extends View {
  @Prop _$content = required

  Body() {
    span(this._$content)
      .className(this.dlightMarkitCode)
      .style({ fontSize: "95%" })
  }

  dlightMarkitCode = css`
    border-radius: 4px;
    background-color: Gainsboro;
    color: DarkOrange;
    padding: 4px;
    font-size: 95%;
`
}

export default Code as any as Typed<Code>
