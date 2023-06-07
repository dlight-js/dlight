// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View } from "@dlightjs/dlight"
import { type Typed, _, Prop } from "@dlightjs/types"

class Route extends View {
  @Prop _$content = " none" // 空格不是合法url，所以不会有问题
  isRoute = true

  Body() {
    _(this._$children)
  }
}

export default Route as any as Typed<Route>
