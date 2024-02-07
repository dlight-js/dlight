import { render } from "@dlightjs/dlight"
import App from "./Fine.view"

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
// const count = 10000
// testPerf(() => {
//   const a = []
//   for (let i = 0; i < count; i++) {
//     a[i] = i
//   }
// })
// testPerf(() => {
//   const a = new Map()

//   for (let i = 0; i < count; i++) {
//     a.set(i, i)
//   }
// })
// class JJ {
//   aa() {
//     console.log(this)
//     return 1
//   }
// }

// class BB {
//   ok = new JJ()
// }
// console.log(new BB().ok.aa())
