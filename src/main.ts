// @ts-ignore
import {TestElement} from "./el1.tsd";
import {reconstructBodyStr} from "./transpiler";


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="root"/>
`
export {}



let newEl = new TestElement()
let body = newEl.render()
console.log(newEl.Body)
document.getElementById('root')!.appendChild(body)


const expCode = `
    div{
     button('ok')
     For(let i of apple) {
         div(i)
     }
     }
`


console.log(reconstructBodyStr(expCode))