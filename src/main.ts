import { $createEl } from "./func"
import {State} from './decorator';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="root"/>
`
export {}


class My {
  @State okk: any = 1
  deps: any = {}

  $listen(el: HTMLElement, propKey: string, deps: string[], action: ()=>any) {
    let func: any
      if (propKey === "innerText") {
        func = () => el.innerText = action()
      } else {
        func = () => el.setAttribute(propKey, action())
      }
    func()
    for (let dep of deps) {
      if (this.deps[dep] === undefined) this.deps[dep] = []
      this.deps[dep].push(func)
    }
  }


  init() {
    const v = this.okk
    this.okk = {
      value: v,
      setValue: (v: any) => {
        (this.okk as any).value = v
        for (let dep of this.deps['okk'] ?? []) {
          dep()
        }
        console.log('hh')
      }
    } as any
  }

  Body = () => {
    this.init()
    const el = $createEl('div')
    // ---- start child
    const el0 = $createEl('div')
    el0.onclick = () => {
        this.okk.setValue(this.okk.value + 1)
    }
    el0.innerText = "button"
    el.appendChild(el0)
    // ---- end child
    // ---- start child
    const el1 = $createEl('div')
    this.$listen(el1, "innerText", ["okk"], () => this.okk.value)
    this.$listen(el1, "style", ["okk"], ()=>this.okk.value > 10 ? 'color: red; width: 50px; height: 50px;' : 'color: blue; width: 50px; height: 50px;')
    el.appendChild(el1)
    // ---- end child

    return el
  }
}

let my = new My()
document.getElementById('root')!.appendChild(my.Body())