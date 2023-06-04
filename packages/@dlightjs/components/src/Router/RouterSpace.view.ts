// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { type DLNode, View } from "@dlightjs/dlight"
import { Navigator } from "./Navigator"
import { getHashLocation, getHistoryLocation } from "./utils"
import { type Typed, _, env, Prop, Static, required } from "@dlightjs/types"

const rawHistoryPushState = history.pushState
let historyPushStateFuncs: Array<() => any> = []

class RouterSpace extends View {
  @Prop mode: Prop<"hash" | "history"> = "history" as any
  @Prop navigator: Prop<Navigator> = required
  currUrl = this.mode === "hash" ? getHashLocation() : getHistoryLocation()

  @Static baseUrl = ""
  @Static prevPathCondition = ""
  @Static prevRoutes: DLNode[] = []

  showedRoute = (function() {
    const prevPathCondition = this.prevPathCondition
    this.prevPathCondition = ""
    const currUrl = this.currUrl.replace(new RegExp(`^${this.baseUrl}`), "")
    const targetNodes: any[] = []

    for (const [idx, child] of this._$children.entries()) {
      if (!child.isRoute) {
        // ---- 如果不是Route直接加，虽然没有意义也不建议这么写
        targetNodes.push(this._$childrenFuncs[idx]())
        continue
      }
      let targetUrl = child._$content
      let isMatch = false
      if (typeof child._$content === "string") {
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
          return this.prevRoutes
        }
        // targetNodes.push(this._$childrenFuncs[idx]())
        targetNodes.push(child)
        this.prevPathCondition = targetUrl
        break
      }
    }
    this.prevRoutes = targetNodes
    return targetNodes
  }.call(this))

  historyChangeListen = () => {
    this.currUrl = getHistoryLocation()
  }

  hashChangeListen = () => {
    this.currUrl = getHashLocation()
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

  AfterConstruct() {
    let parent: any = this._$parentNode
    while (parent) {
      if (parent.isRoute) {
        this.baseUrl = parent._$content + "/" + this.baseUrl
      }
      parent = parent._$parentNode
    }
  }

  Preset() {
    const newNavigator = new Navigator()
    newNavigator.mode = this.mode
    this.navigator = newNavigator as any
  }

  routeParam = {
    path: this.currUrl,
    navigator: this.navigator
  }

  Body() {
    env()
      .RouteParam(this.routeParam)
    {
      _(this.showedRoute)
    }
  }
}

export default RouterSpace as any as Typed<RouterSpace>
