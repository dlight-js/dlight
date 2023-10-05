import { render } from "@dlightjs/dlight"
import App from "./App.view"
import Main from "./benchmark-keyed.view"

render("app", App)

const a = Array(10000).fill(0).map((_, i) => i)
console.time("0")
for (let i = 0; i < 10000; i++) {
  const a = `jie${i}fea`
}
console.timeEnd("0")

console.time("0")
for (let i = 0; i < 10000; i++) {
  const a = `jie${i}`
}
console.timeEnd("0")
