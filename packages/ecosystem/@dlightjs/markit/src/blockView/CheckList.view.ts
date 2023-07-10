import DLight, { View } from "@dlightjs/dlight"
import { div, input, Prop, required, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import BlockRenderer from "."
import InlineRenderer from "../inlineView"

class CheckList extends View {
  @Prop _$content = required
  @Prop props = required
  isChecked = this.props.isChecked

  Body() {
    div()
      .className(this.dlightMarkitCheckList)
    {
      for (const { item: itemList, content: contentList } of this._$content) {
        div()
          .className(this.dlightMarkitCheckboxWrap)
        {
          input()
            .type("checkbox")
            .checked(this.isChecked)
            .disabled(true)
            .className(this.dlightMarkitCheckbox)
          for (const item of itemList) {
            InlineRenderer[item.type](item.content)
              .props(item.props)
          }
        }
        for (const subcontent of contentList) {
          BlockRenderer[subcontent.type](subcontent.content)
            .props(subcontent.props)
        }
      }
    }
  }

  /** @style */
  dlightMarkitCheckList = css``
  dlightMarkitCheckboxWrap = css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `
  dlightMarkitCheckbox = css`
    margin-right: 5px;
  `
}

export default CheckList as any as Typed<CheckList>
