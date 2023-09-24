import { Prop, required, View, Content } from "@dlightjs/dlight"
import { type ContentProp, li, ol, type Pretty, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import BlockRenderer from "."
import InlineRenderer from "../inlineView"

interface OrderedListProps {
  ast: ContentProp<any>
  props: any
}
@View
class OrderedList implements OrderedListProps {
  @Prop @Content ast = required

  @Prop props = required
  start = this.props.start

  Body() {
    ol()
      .start(this.start)
      .className(this.dlightMarkitOrderedListOl$)
    {
      for (const { content, item: itemList } of this.ast) {
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

export default OrderedList as Pretty as Typed<OrderedListProps>
