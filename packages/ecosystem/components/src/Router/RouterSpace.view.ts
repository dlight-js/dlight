import { type DLNode, View, Children, required, Prop, env, Watch } from "@dlightjs/dlight"
import { Navigator } from "./Navigator"
import { getHashLocation, getHistoryLocation } from "./utils"
import { type Typed, _, type Pretty } from "@dlightjs/types"

const rawHistoryPushState = history.pushState
let historyPushStateFuncs: Array<() => any> = []

interface RouterSpaceProps {
  mode?: "hash" | "history"
  getNavigator?: (nav: Navigator) => void
}
@View
class RouterSpace implements RouterSpaceProps {
  @Prop mode: "hash" | "history" = "history"
  @Prop getNavigator?: (nav: Navigator) => void
  @Children children: DLNode[] = required

  currUrl = this.mode === "hash" ? getHashLocation() : getHistoryLocation()

  baseUrl = ""
  prevPathCondition = ""
  currentRoute: DLNode[] = []
  navigator = new Navigator()

  @Watch
  updateRoute() {
    const prevPathCondition = this.prevPathCondition
    this.prevPathCondition = ""
    const currUrl = this.currUrl.replace(new RegExp(`^${this.baseUrl}`), "")
    const targetNodes: any[] = []
    const prevRoutes = this.currentRoute

    for (const child of this.children) {
      if (!(child as any).isRoute) continue
      let targetUrl = (child as any).path
      let isMatch = false
      if (typeof (child as any).path === "string") {
        targetUrl = targetUrl.replace(/^(\.\/)+/, "")
        const isRootRoute = (targetUrl === "." && currUrl === "")
        const isPathMatch = ((currUrl + "/").startsWith(targetUrl + "/"))
        const isOther = (targetUrl === " none")
        isMatch = isRootRoute || isPathMatch || isOther
      } else if (targetUrl instanceof RegExp) {
        // ---- 匹配正则
        isMatch = targetUrl.test(currUrl)
      }

      if (isMatch) {
        if (targetUrl === prevPathCondition) {
          // ---- 发现condition没有改变，直接return原来的
          this.prevPathCondition = prevPathCondition
          return prevRoutes
        }
        targetNodes.push(child)
        this.prevPathCondition = targetUrl
        break
      }
    }
    this.currentRoute = targetNodes
  }

  historyChangeListen = () => {
    this.currUrl = getHistoryLocation()
  }

  hashChangeListen = () => {
    this.currUrl = getHashLocation()
  }

  willMount() {
    this.navigator.mode = this.mode
    this.getNavigator?.(this.navigator)
    let parent: any = (this as any)._$parentNode
    while (parent) {
      if (parent.isRoute) {
        this.baseUrl = parent._$content + "/" + this.baseUrl
      }
      parent = parent._$parentNode
    }
  }

  didMount() {
    if (this.mode === "hash") {
      addEventListener("load", this.hashChangeListen)
      addEventListener("hashchange", this.hashChangeListen)
      return
    }
    addEventListener("load", this.historyChangeListen)
    addEventListener("popstate", this.historyChangeListen)

    // ---- 监听pushState
    historyPushStateFuncs.push(this.historyChangeListen)
    history.pushState = new Proxy(rawHistoryPushState, {
      apply: (target, thisArg, argArray) => {
        const res = target.apply(thisArg, argArray as any)
        for (const func of historyPushStateFuncs) {
          func()
        }
        return res
      }
    })
  }

  willUnmount() {
    if (this.mode === "hash") {
      removeEventListener("load", this.hashChangeListen)
      removeEventListener("hashchange", this.hashChangeListen)
      return
    }
    removeEventListener("load", this.historyChangeListen)
    removeEventListener("popstate", this.historyChangeListen)
    historyPushStateFuncs = historyPushStateFuncs.filter(func => func !== this.historyChangeListen)
    if (historyPushStateFuncs.length > 0) {
      history.pushState = new Proxy(rawHistoryPushState, {
        apply: (target, thisArg, argArray) => {
          const res = target.apply(thisArg, argArray as any)
          for (const func of historyPushStateFuncs) {
            func()
          }
          return res
        }
      })
    } else {
      history.pushState = rawHistoryPushState
    }
  }

  Body() {
    env()
      .navigator(this.navigator)
      .path(this.currUrl)
    {
      _(this.currentRoute)
    }
  }
}

export default RouterSpace as Pretty as Typed<RouterSpaceProps>
