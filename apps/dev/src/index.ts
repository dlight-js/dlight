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
