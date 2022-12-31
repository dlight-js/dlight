// @ts-ignore
import {TestElement} from "./el1.tsd";
// @ts-ignore
import {Benchmark} from "./benchmark.tsd";
import * as _ from "lodash"
// @ts-ignore
import {TestElement2} from "./el2.tsd";
import {render} from "./core/utils";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="root"/>
`
export {}



// let newEl = new Benchmark()
// let newEl = new TestElement()
// let body = newEl.render()
// console.log(newEl.Body)
// document.getElementById('root')!.append(...body)


// render("root", new Benchmark())
// render("root", new TestElement2())
render("root", new TestElement())


function hh(defaultValue: string) {
    return function (target: any, rawKey: string) {
        Object.defineProperty(target, rawKey, {
            get() {
                return this.okk ?? defaultValue
            }
        })
    }
}

