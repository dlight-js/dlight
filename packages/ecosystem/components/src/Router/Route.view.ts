import { Children, type DLNode, Content, View, required, Prop } from "@dlightjs/dlight"
import { type Typed, _, type Pretty, type ContentProp } from "@dlightjs/types"

interface RouteProps {
  _$path?: ContentProp<string>
  lazyLoad?: () => Promise<{ default: any }>
}

@View
class Route implements RouteProps {
  @Prop @Content path = " none" // 空格不是合法url，所以不会有问题
  @Prop lazyLoad?: () => Promise<{ default: any }>
  @Children children: DLNode[] = required
  lazyLoadedComp?: any
  isRoute = true

  async willMount() {
    if (this.lazyLoad) this.lazyLoadedComp = (await this.lazyLoad()).default
  }

  Body() {
    if (this.lazyLoadedComp) {
      this.lazyLoadedComp()
    } else {
      _(this.children)
    }
  }
}

export default Route as Pretty as Typed<RouteProps>
