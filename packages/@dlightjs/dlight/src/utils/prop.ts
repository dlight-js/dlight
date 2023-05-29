import { type CustomNode, type EnvNode } from "../Nodes"

function addToDepChain(dlNode: CustomNode, key: string, defaultValue: any) {
  (dlNode as any)[`_$$${key}`] = defaultValue
  Object.defineProperty(dlNode, key, {
    get() {
      return this[`_$$${key}`]
    },
    set(value: any) {
      this._$updateProperty(key, value)
    }
  })
  dlNode._$deps[key] = new Map()
}

function addProp(dlNode: CustomNode, key: string, defaultValue: any) {
  (dlNode as any)[`_$$${key}`] = defaultValue
  Object.defineProperty(dlNode, key, {
    value: defaultValue,
    writable: true
  })
  dlNode._$deps[key] = new Map()
}

export function forwardDLProp(dlNode: CustomNode, key: string, propFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[], isTwoWayConnected?: boolean) {
  if (!(`_$$${key}` in dlNode)) {
    // ---- 新建一个state
    (dlNode as any)[`_$$$${key}`] = "prop"
    if (listenDeps) {
      addToDepChain(dlNode, key, propFunc())
    } else {
      addProp(dlNode, key, propFunc)
    }
  }
  if (!listenDeps) {
    (dlNode as any)[key] = propFunc
    return
  }
  if (listenDeps?.length === 1 && isTwoWayConnected) {
    addTwoWayDLProp(dlScope!, dlNode, key, listenDeps[0])
    return
  }
  addOneWayDLProp(dlScope!, dlNode, key, propFunc, listenDeps)
}

export function addDLProp(dlNode: CustomNode, tag: "env" | "prop", key: string, propFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[], isTwoWayConnected?: boolean) {
  if (dlNode?._$forwardProps && tag === "prop") {
    forwardDLProp(dlNode, key, propFunc, dlScope, listenDeps)
    return
  }
  if (!(key in dlNode)) return
  if (!listenDeps) {
    (dlNode as any)[key] = propFunc
    return
  }

  if ((dlNode as any)[`_$$$${key}`] !== tag) {
    // ---- 不是prop或env，或者不匹配
    return
  }

  if (isTwoWayConnected &&
    listenDeps.length === 1 &&
    `_$$${listenDeps[0]}` in dlScope!) {
    addTwoWayDLProp(dlScope!, dlNode, key, listenDeps[0])
    return
  }
  addOneWayDLProp(dlScope!, dlNode, key, propFunc, listenDeps)
}

// 子里面的值改变，父的值也相应改变。给子变量挂载上父变量的改变函数。
export function addTwoWayDLProp(dlScope: CustomNode, dlNode: CustomNode, key: string, depKey: string) {
  // ---- 如果是完整match且是state不是derived，比如 {flag: this.flag}
  //      则把子dl的flag参数当成state
  const objectId = {}
  dlNode._$depObjectIds.push(objectId)

  if (!(`_$$${key}` in dlNode)) {
    // 有可能 @Prop 不是state，不在依赖链里面，所以需要加入依赖链
    addToDepChain(dlNode, key, (dlNode as any)[key])
  }

  const depFunc = () => {
    (dlScope as any)[depKey] = (dlNode as any)[key]
  }
  dlNode._$addDeps([key], objectId, depFunc);
  (dlNode as any)[key] = (dlScope as any)[depKey]
  dlScope._$addDeps([depKey], objectId, () => {
    // ---- 先取消回调自己的dep，等改完值了再加上，不然会无限回调
    dlNode._$deleteDep(key, objectId);
    (dlNode as any)[key] = (dlScope as any)[depKey]
    dlNode._$addDeps([key], objectId, depFunc)
  })
}

export function addOneWayDLProp(dlScope: CustomNode, dlNode: CustomNode | EnvNode, key: string, propFunc: () => any, listenDeps: string[]) {
  const objectId = {}
  dlNode._$depObjectIds.push(objectId);

  (dlNode as any)[key] = propFunc()
  dlScope._$addDeps(listenDeps, objectId, () => {
    (dlNode as any)[key] = propFunc();
    (dlNode as any)._$runDeps(key)
  })
}
