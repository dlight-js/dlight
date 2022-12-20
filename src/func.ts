import {DLBase} from './DLBase';

export function $createEl(tag: string) {
    return document.createElement(tag)
}


export function $listen(dl: DLBase, el: HTMLElement, propKey: string, deps: string[], action: ()=>any) {
    let func: any
      if (propKey === "innerText") {
        func = () => el.innerText = action()
      } else {
        func = () => el.setAttribute(propKey, action())
      }
    func()
    for (let dep of deps) {
      if (dl._$deps[dep] === undefined) dl._$deps[dep] = []
      dl._$deps[dep].push(func)
    }
  }

