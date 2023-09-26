
export function ForwardProp<T extends new(...args: any[]) => {}>(constructor: T, ..._: any) {
  return class extends constructor {
    _$forwardProps = true
  }
}

export function Func(func: (...args: any) => any, ...args: any) {
  return function <T extends new(...args: any[]) => any>(constructor: T, ..._: any) {
    return class extends constructor {
      willMount() {
        super.willMount?.()
        func.call(this, ...args)
      }
    }
  }
}

export { Observable } from "./obeservable"
