import { View } from "@dlightjs/dlight"
import { div, type Pretty, Prop, required, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

interface DividerProps {
  _$content: any
  props: any
}
class Divider extends View implements DividerProps {
  @Prop _$content = required
  @Prop props = required
  dividerType = this.props.dividerType

  Body() {
    div()
      .className(this.dlightMarkitDivider$)
      .className(this.dlightMarkitDivider$_(this.dividerType))
  }

  dlightMarkitDivider$ = css`
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: gray;
    margin: 4px;
    height: 0px;
    width: auto;
  `
  dlightMarkitDivider$_ = (borderType: string) => css`
    border-style: ${borderType};
  `
}

export default Divider as Pretty as Typed<DividerProps>
