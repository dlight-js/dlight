import { $createEl, $listen } from "./func"
import {State, DecoratorMaker, DecoratorTrimmer} from './decorator';
import { DLBase } from "./DLBase";
import { view } from "./parser"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="root"/>
`
export {}

class TestElement extends DLBase {
  @State okk: any = 1
  el: any

  BodyExpected = `
    div {
      div("button")
        .onclick(() => {
          okk += 1
        })
      div(okk)
        .style(okk > 10 ? 'color: red;' : 'color: blue;')
    }
  `

  Body = `
    const { $createEl, $listen } = arguments[0]

    const el = $createEl('div')
    const el0 = $createEl('div')
    el0.onclick = () => {
      this._$okk_state += 1
    }
    el0.innerText = "button"
    el.appendChild(el0)
    const el1 = $createEl('div')
    $listen(this, el1, "innerText", ["okk"], () => this._$okk_state)
    $listen(this, el1, "style", ["okk"], ()=>this._$okk_state > 10 ? 'color: red;' : 'color: blue;')
    el.appendChild(el1)

    this.el = el
  `
  kk = () => {
    new Function(this.Body).call(this, {$createEl, $listen})
    console.log(new Function(this.Body))
  }
}

let my = new TestElement()
my.kk()
document.getElementById('root')!.appendChild(my.el)





const k = view`
div {
  div("button"){
    div("nested2")
  }
    .onclick(() => {
      okk += 1
    })
  div(okk)
    .style(okk > 10 ? 'color: red;' : 'color: blue;')
}
.height('100')
`





