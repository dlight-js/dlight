const { $createEl, $listen } = arguments[0]
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
this._$el = el0