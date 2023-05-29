import { View, type DLNode, manual } from "@dlightjs/dlight"
import { Navigator } from "./Navigator"
import { getHashLocation, getHistoryLocation } from "./utils"
import Types, { _, env, Prop } from "@dlightjs/types"

const rawHistoryPushState = history.pushState
let historyPushStateFuncs: Array<() => any> = []

interface RouterSpaceProps {
  mode?: "hash" | "history"
  navigator?: Navigator
}

class RouterSpace extends View implements RouterSpaceProps {
  @Prop mode: "hash" | "history" = "history"
  @Prop navigator?: Navigator
  currUrl = this.mode === "hash" ? getHashLocation() : getHistoryLocation()
  baseUrl = ""

  prevPathCondition = ""
  prevRoutes: DLNode[] = []

  showedRoute = manual(() => {
    const prevPathCondition = this.prevPathCondition
    this.prevPathCondition = ""
    const currUrl = this.currUrl.replace(new RegExp(`^${this.baseUrl}`), "")
    const targetNodes: any[] = []

    for (const child of this._$children) {
      if (!child.isRoute) {
        // ---- 如果不是Route直接加，虽然没有意义也不建议这么写
        targetNodes.push(child)
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
        targetNodes.push(child)
        this.prevPathCondition = targetUrl
        break
      }
    }
    this.prevRoutes = targetNodes
    return targetNodes
  }, [this.currUrl])

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
    let parent = this._$parentNode
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
    this.navigator = newNavigator
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

export default Types<RouterSpaceProps>(RouterSpace)
