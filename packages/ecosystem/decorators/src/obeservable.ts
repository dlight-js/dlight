
function createObservableObject(target: any, func: Function, wrapper?: boolean) {
  // 定义handler对象
  const proxiedTarget = new Proxy(target, {
    set(obj, key, value) {
      if (typeof value === "object" && value !== null) {
        obj[key] = createObservableObject(value, func) // 如果值是一个对象，则再次对其进行代理
      } else {
        obj[key] = value
      }
      func()
      return true
    }
  })

  // 对每一个对象属性进行代理，确保嵌套对象也被代理
  if (!wrapper) {
    for (const key in target) {
      const value = target[key]
      if (typeof value === "object" && value !== null) {
        target[key] = createObservableObject(target[key], func)
      }
    }
  }

  return proxiedTarget
}

// @TODO how to handle array? @orange04
export function Observable(target: any, key: string) {
  const realKey = key.slice(3)

  if (delete target[realKey]) {
    let firstIn = true
    const newObservable = function() {
      this._$updateProperty(realKey, createObservableObject({ ...this[key] }, newObservable.bind(this), true))
    }
    Object.defineProperty(target, realKey, {
      get() {
        if (firstIn) {
          this[key] = createObservableObject(this[key], newObservable.bind(this))
          firstIn = false
        }
        return this[key]
      },
      set(value) {
        this._$updateProperty(realKey, createObservableObject(value, newObservable.bind(this)))
      }
    })
  }
}
