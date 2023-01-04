import {ToDoApp} from "./example/ToDoApp/index.tsd";
import {Benchmark} from "./example/benchmark.tsd";
import {render} from "./core/utils";


export {}

// render("#app", new Benchmark())
// render("#app", new ToDoApp())



let t1,t2
t1 = performance.now()
let a = document.querySelector("#app")!
let j = ""
for (let i of [...Array(10000).keys()]) {
    j += "<div>fucb</div>"
}
a.innerHTML = j
t2 = performance.now()
console.log(t2-t1)
a.innerHTML = ""
t1 = performance.now()
let t = document.querySelector("#app")!
let b: any[] = []
for (let i of [...Array(10000).keys()]) {
    let n = document.createElement("div")
    n.innerText = "fuca"
    b.push(n)
}
t.append(...b)
t2 = performance.now()
console.log(t2-t1)