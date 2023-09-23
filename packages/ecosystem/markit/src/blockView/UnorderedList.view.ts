import { View } from "@dlightjs/dlight"
import { li, Prop, required, ul, type Typed, type Pretty } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import BlockRenderer from "."
import InlineRenderer from "../inlineView"

interface UnorderedListProps {
  _$content: any
  props: any
}
class UnorderedList extends View implements UnorderedListProps {
  @Prop _$content = required
  @Prop props = required
  level = this.props.level

  Body() {
    ul()
      .className(this.dlightMarkitUnorderedListUl$)
    {
      for (const { content, item: itemList } of this._$content) {
        li()
          .className(this.dlightMarkitUnorderedListLi$)
        {
          for (const item of itemList) {
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

export default UnorderedList as Pretty as Typed<UnorderedListProps>
