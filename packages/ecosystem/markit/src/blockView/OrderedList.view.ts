import { View } from "@dlightjs/dlight"
import { li, ol, Prop, required, type Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"
import BlockRenderer from "."
import InlineRenderer from "../inlineView"

class OrderedList extends View {
  @Prop _$content = required
  @Prop props = required
  start = this.props.start

  Body() {
    ol()
      .start(this.start)
      .className(this.dlightMarkitOrderedListOl$)
    {
      for (const { content, item: itemList } of this._$content) {
        li()
          .className(this.dlightMarkitOrderedListLi$)
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

  dlightMarkitOrderedListOl$ = css``

  dlightMarkitOrderedListLi$ = css``
}

export default OrderedList as any as Typed<OrderedList>
