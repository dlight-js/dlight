import { View } from "@dlightjs/dlight"
import { type Typed, _, Prop, type Pretty } from "@dlightjs/types"

interface RouteProps {
  _$content?: string
  lazyLoad?: () => Promise<{ default: any }>
}

class Route extends View implements RouteProps {
  @Prop _$content = " none" // 空格不是合法url，所以不会有问题
  @Prop lazyLoad?: () => Promise<{ default: any }>
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

export default Route as Pretty as Typed<RouteProps>
