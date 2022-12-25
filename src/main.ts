import {State} from './decorator';
import { DLBase } from "./DLBase";
import {$createEl, $listen} from "./func";
import {AnotherEl} from "./anotherEl";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="root"/>
`
export {}

class TestElement extends DLBase {
  @State count: number = 1
  Body = view`
    div('ok') {
      button("plus")
        .onclick(() => {
          console.log('我被点了')
          count += 2
        })
      button("minus")
        .onclick(() => {
          console.log('我被减了')
          count -= 2
        })
      div(count)
        .style(count > 10 ? 'color: red;' : 'color: blue;')
      div {
        span('what')
      }
    }
      .height('100')
  `

  BodyExpected = `
    const { $createEl, $listen, AnotherEl } = arguments[0]
    const el0 = $createEl('div')
    el0.height = '100'
    el0.innerText = 'ok'
    const el1 = $createEl('button')
    el1.onclick = () => {
      console.log('我被点了')
      this._$count_state += 2
    }
    el1.innerText = "plus"
    el0.appendChild(el1)
    const el2 = $createEl('button')
    el2.onclick = () => {
      console.log('我被减了')
      this._$count_state -= 2
    }
    el2.innerText = "minus"
    el0.appendChild(el2)
    const el3 = $createEl('div')
    $listen(this, el3, "style", ["count"], ()=>this._$count_state > 10 ? 'color: red;' : 'color: blue;')
    $listen(this, el3, "innerText", ["count"], ()=>this._$count_state)
    el0.appendChild(el3)
    const el4 = $createEl('div')
    const el5 = $createEl('span')
    el5.innerText = 'what'
    el4.appendChild(el5)
    el0.appendChild(el4)

    const el6 = (new AnotherEl()).render()
    el0.appendChild(el6)
    this._$el = el0
  `
}

let my = new TestElement()
// document.getElementById('root')!.appendChild(my.render())

new Function(my.BodyExpected).call(my, {$createEl, $listen, AnotherEl})
document.getElementById('root')!.appendChild(my._$el!)
