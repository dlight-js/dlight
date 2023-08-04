import { View } from "@dlightjs/dlight"
import { Prop, required, span, type Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"

class Code extends View {
  @Prop _$content = required

  Body() {
    span(this._$content)
      .className(this.dlightMarkitCode$)
  }

  dlightMarkitCode$ = css`
    border-radius: 4px;
    background-color: Gainsboro;
    color: DarkOrange;
    padding: 4px;
    font-size: 95%;
`
}

export default Code as any as Typed<Code>
