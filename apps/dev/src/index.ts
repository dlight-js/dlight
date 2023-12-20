import { render } from "@dlightjs/dlight"
import App from "./App.view"
import Main from "./benchmark-keyed.view"

import * as babel from "@babel/standalone"
import dlight from "babel-preset-dlight"
import { TransitionTest } from "./transition.view"
// console.log(1)
// const a = document.createElement("div")
// const j = 100000
// const t1 = performance.now()
// for (let i = 0; i < j; i++) {
//   a.setAttribute("class", "nono")
//   a.className = ""
// }
// console.log(performance.now() - t1)
// const t2 = performance.now()
// for (let i = 0; i < j; i++) {
//   a.className = "nono"
//   a.className = ""
// }
// console.log(performance.now() - t2)
// a.setAttribute("nono", "shit")
// a.form = 1

// console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(a)))

render("main", App)

// function testPerf(func: () => void) {
//   // multiple times to get average
//   const times = []
//   for (let i = 0; i < 3; i++) {
//     const start = performance.now()
//     func()
//     const end = performance.now()
//     times.push(end - start)
//   }
//   console.log(times.reduce((a, b) => a + b, 0) / times.length)
// }

// const count = 100000
// const a = []
// testPerf(() => {
//   for (let i = 0; i < count; i++) {
//     a.push(() => 10 * 10)
//   }
// })
// testPerf(() => {
//   for (const i of a) {
//     i()
//   }
// })

// const b = new Set()
// testPerf(() => {
//   for (let i = 0; i < count; i++) {
//     b.add(() => 10 * 10)
//   }
// })
// testPerf(() => {
//   for (const i of b) {
//     i()
//   }
// })
