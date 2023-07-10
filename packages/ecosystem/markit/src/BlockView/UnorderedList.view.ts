import DLight, { View } from "@dlightjs/dlight"
import { li, Prop, required, ul, type Typed } from "@dlightjs/types"
import BlockRenderer from "."
import InlineRenderer from "../InlineView"

class UnorderedList extends View {
  @Prop _$content = required
  @Prop props = required
  level = this.props.level

  Body() {
    ul()
    {
      for (const { content, item: itemList } of this._$content) {
        for (const item of itemList) {
          li()
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
}

export default UnorderedList as any as Typed<UnorderedList>
