import { View } from "@dlightjs/dlight"
import { div, Prop, required, type Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"

class Divider extends View {
  @Prop _$content = required
  @Prop props = required
  dividerType = this.props.dividerType

  Body() {
    div()
      .className(this.dlightMarkitDivider)
      .className(this.dlightMarkitDivider_(this.dividerType))
  }

  dlightMarkitDivider = css`
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: gray;
    margin: 4px;
    height: 0px;
    width: auto;
  `
  dlightMarkitDivider_ = (borderType: string) => css`
    border-style: ${borderType};
  `
}

export default Divider as any as Typed<Divider>
