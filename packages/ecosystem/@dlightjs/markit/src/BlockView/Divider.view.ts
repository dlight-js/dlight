import DLight, { View } from "@dlightjs/dlight"
import { div, Prop, required, type Typed } from "@dlightjs/types"

class Divider extends View {
  @Prop _$content = required
  @Prop props = required
  dividerType = this.props.dividerType
  borderStyle = {
    solid: "border-solid",
    dotted: "border-dotted",
    dashed: "border-dashed"
  }

  Body() {
    div()
      .className(`border-y border-gray-400 m-4 h-0.5 w-auto ${this.borderStyle[this.dividerType]}`)
  }
}

export default Divider as any as Typed<Divider>
