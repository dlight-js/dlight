import { Prop, View, required, Content } from "@dlightjs/dlight"
import { type Pretty, span, type Typed, type ContentProp } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

interface CodeProps {
  ast: ContentProp<any>
}
@View
class Code implements CodeProps {
  @Prop @Content ast = required

  Body() {
    span(this.ast)
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
