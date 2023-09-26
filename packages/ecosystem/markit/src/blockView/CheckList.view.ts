import { Prop, required, View, Content } from "@dlightjs/dlight"
import { type ContentProp, div, input, type Pretty, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import BlockRenderer from "."
import InlineRenderer from "../inlineView"

interface CheckListProps {
  ast: ContentProp<any>
  props: any
}

@View
class CheckList implements CheckListProps {
  @Prop @Content ast = required

  @Prop props = required
  isChecked = this.props.isChecked

  Body() {
    div()
      .className(this.dlightMarkitCheckList$)
    {
      for (const { item: itemList, content: contentList } of this.ast) {
        div()
          .className(this.dlightMarkitCheckboxWrap$)
        {
          input()
            .type("checkbox")
            .checked(this.isChecked)
            .disabled(true)
            .className(this.dlightMarkitCheckbox$)
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
  dlightMarkitCheckList$ = css``
  dlightMarkitCheckboxWrap$ = css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `
  dlightMarkitCheckbox$ = css`
    margin-right: 5px;
  `
}

export default CheckList as Pretty as Typed<CheckListProps>
