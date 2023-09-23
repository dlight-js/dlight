import { View } from "@dlightjs/dlight"
import { type Pretty, Prop, required, span, type Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"

interface CodeProps {
  _$content: any
}
class Code extends View implements CodeProps {
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

export default Code as Pretty as Typed<CodeProps>
