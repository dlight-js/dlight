// // @ts-ignore
// import {ToDoApp} from "./example/ToDoApp/index.tsd";
// // @ts-ignore
import {NestedElement} from "./example/performance";
// // @ts-ignore
// import {TestElement} from "./example/el1.tsd";
// import {render} from "./core/utils";
// import {IfTest, ForTest, FlowTest, EnvTest, LifeCycleTest} from "./example/features"
// import { initNodes, parentNodes, resolveEnvs } from "./core/Nodes/utils";
// import {SubElement} from "./example/test.tsd"
// @ts-ignore
import {ToDoApp} from "./example/ToDoApp/index.tsd";

export {}

// @ts-ignore
import {TestTest} from "./test.tsd"
import {render, uid} from "./core/utils";
// @ts-ignore
import {Benchmark} from "./example/performance/benchmark.tsd"

// console.log(t2-t1)
render("#app", new Benchmark())
console.time("1")
for (let i=0;i<100000;i++) {
    uid()
}
console.timeEnd("1")

// class OK {
//     a = {}
//     b = []
// }
// let b = []
// let tt = 0, ttt = 0
// for (let i=0; i< 10000; i++) {
//     let t = new OK()
//     for (let i = 0; i < 20; i++) {
//         let t1 = performance.now()
//         t.b.push([`jfajdad_${i}`, () => {}])
//         // t.a[`jfajdad_${i}`] = () => {}
//         let t2 = performance.now()
//         ttt += t2-t1
//         // b.push(t)
//         // b.push(t)
//     }
//     let t1 = performance.now()
//     // delete t.a[`jfajdad_100`]
//     t.b = t.b.filter(i=>i!==`jfajdafafd_10`)
//     let t2 = performance.now()
//     tt += t2-t1
// }
// console.log(ttt, tt)

// document.getElementById("app")!.onclick = () => {
//     console.log(b.length)
// }

// enum TestType {
//     Benchmark, If, For, Flow, Env, ToDo, LifeCycle, MultiElement, NestedElement, None
// }
//
// let testType: TestType = TestType.NestedElement


// switch (testType) {
//     case TestType.ToDo:
//         render("#app", new ToDoApp())
//         break
//     case TestType.Benchmark:
//         render("#app", new Benchmark())
//         break
//     case TestType.If:
//         render("#app", new IfTest())
//         break
//     case TestType.For:
//         render("#app", new ForTest())
//         break
//     case TestType.Flow:
//         render("#app", new FlowTest())
//         break
//     case TestType.Env:
//         render("#app", new EnvTest())
//         break
//     case TestType.LifeCycle:
//         render("#app", new LifeCycleTest())
//         break
//     case TestType.MultiElement:
//         render("#app", new MultiElement())
//         break
//     case TestType.NestedElement:
//         render("#app", new NestedElement())
//         break
// }


// let b = []
// for (let _ of [...Array(10000).keys()]) {
//     let j = new SubElement()
//     j._$initDecorators()
//     j.Body()
//     j.Body = () => {}
//     parentNodes(j._$nodes, j)
//     resolveEnvs(j._$nodes, j)
//     initNodes(j._$nodes)
//     // j._$init()
//     b.push(j)
// }



