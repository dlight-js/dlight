import DLight, { View } from "@dlightjs/dlight"
import { div, Prop, required, type Typed } from "@dlightjs/types"
import InlineRenderer from "../InlineView"

class Heading extends View {
  @Prop _$content = required
  @Prop props = required
  headingLevel = this.props.headingLevel
  classNames = {
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
    4: "text-xl",
    5: "text-lg"
  }

  Body() {
    div()
      .className(this.classNames[this.headingLevel])
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
          .props(content.props)
      }
    }
  }
}

export default Heading as any as Typed<Heading>
