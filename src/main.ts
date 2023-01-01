// @ts-ignore
import {TestElement} from "./el1.tsd";
// @ts-ignore
import {Benchmark} from "./benchmark.tsd";
import * as _ from "lodash"
// @ts-ignore
import {TestElement2} from "./el2.tsd";
import {render, uid} from "./core/utils";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="root"/>
`
export {}



// let newEl = new Benchmark()
// let newEl = new TestElement()
// let body = newEl.render()
// console.log(newEl.Body)
// document.getElementById('root')!.append(...body)


render("root", new Benchmark())
// render("root", new TestElement2())
// render("root", new TestElement())

// let t1,t2
//
// t1 = performance.now()
// for (let i of [...Array(10000).keys()]) {
//     let a = Math.random().toString(20).slice(2)
// }
// t2 = performance.now()
// console.log(t2-t1)


