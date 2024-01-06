import { render } from "@dlightjs/dlight"
import App from "./App.view"

render("main", App)

function testPerf(func: () => void) {
  // multiple times to get average
  const times = []
  for (let i = 0; i < 3; i++) {
    const start = performance.now()
    func()
    const end = performance.now()
    times.push(end - start)
  }
  console.log(times.reduce((a, b) => a + b, 0) / times.length)
}

const a = Array(1000)
  .fill(0)
  .map((_, idx) => `${idx}`)
const b = Array(1000).fill(1)
testPerf(() => {
  const c = a.length === new Set(a).size
})

testPerf(() => {
  const c = []
  for (let idx = a.length - 1; idx >= 0; idx--) {
    c.push(idx)
  }
})
