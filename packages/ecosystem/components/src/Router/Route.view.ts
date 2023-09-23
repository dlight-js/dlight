import { View } from "@dlightjs/dlight"
import { type Typed, _, Prop } from "@dlightjs/types"

class Route extends View {
  @Prop _$content: Prop<string> = " none" as any // 空格不是合法url，所以不会有问题
  @Prop lazyLoad: Prop<() => Promise<{ default: any }>> = null as any
  lazyLoadedComp?: any
  isRoute = true

  async willMount() {
    if (this.lazyLoad) this.lazyLoadedComp = (await this.lazyLoad()).default
  }

  Body() {
    if (this.lazyLoadedComp) {
      this.lazyLoadedComp()
    } else {
      _(this._$children)
    }
  }
}

export default Route as any as Typed<Route>
