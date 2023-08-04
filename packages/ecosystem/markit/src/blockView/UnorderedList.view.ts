import { View } from "@dlightjs/dlight"
import { li, Prop, required, ul, type Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"
import BlockRenderer from "."
import InlineRenderer from "../inlineView"

class UnorderedList extends View {
  @Prop _$content = required
  @Prop props = required
  level = this.props.level

  Body() {
    ul()
      .className(this.dlightMarkitUnorderedListUl$)
    {
      for (const { content, item: itemList } of this._$content) {
        for (const item of itemList) {
          li()
            .className(this.dlightMarkitUnorderedListLi$)
          {
            InlineRenderer[item.type](item.content)
              .props(item.props)
          }
        }
        for (const subcontent of content) {
          BlockRenderer[subcontent.type](subcontent.content)
            .props(subcontent.props)
        }
      }
    }
  }

  dlightMarkitUnorderedListUl$ = css``

  dlightMarkitUnorderedListLi$ = css``
}

export default UnorderedList as any as Typed<UnorderedList>
