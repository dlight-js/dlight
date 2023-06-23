import DLight, { View } from "@dlightjs/dlight"
import { div, Prop, required, type Typed } from "@dlightjs/types"
import BlockRenderer from "."
import InlineRenderer from "../InlineView"

class UnorderedList extends View {
  @Prop _$content = required
  @Prop props = required
  level = this.props.level
  classNames = {
    0: "w-1.5 h-1.5 rounded-md bg-gray-950 mx-3",
    1: "w-1.5 h-1.5 rounded-md border border-gray-900 ml-5 mr-3"
  }

  Body() {
    div()
      .className("pl-1")
    {
      for (const { content, item: itemList } of this._$content) {
        for (const item of itemList) {
          div()
            .className("flex flex-row items-center")
          {
            div()
              .className(this.classNames[this.level])
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
