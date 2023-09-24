import { Prop, required, View, Content } from "@dlightjs/dlight"
import { type ContentProp, div, type Pretty, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

interface DividerProps {
  ast: ContentProp<any>
  props: any
}
@View
class Divider implements DividerProps {
  @Prop @Content ast = required

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
