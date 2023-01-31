// // @ts-ignore
// import {ToDoApp} from "./example/ToDoApp/index.jsd";
// @ts-ignore
// import {NestedElement} from "./example/performance/nestedElement.tsd";
// // // @ts-ignore
// // import {TestElement} from "./example/el1.jsd";
// // import {render} from "./dlight/utils";
// // @ts-ignore
// import {IfTest, ForTest, FlowTest, EnvTest, LifeCycleTest} from "./example/features"
// import {ForTest} from "./example/features/for.tsd"
// import {IfTest} from "./example/features/if.tsd"
// import {FlowTest} from "./example/features/flow.tsd"
// // import { initNodes, bindParentNode, resolveEnvs } from "./dlight/Nodes/utils";
// // import {SubElement} from "./example/test.jsd"
// @ts-ignore
// import {ToDoApp} from "./example/ToDoApp/index.tsd";
// // @ts-ignore
// import {Counter} from "./example/test.jsd"
// export {}

// // @ts-ignore
// import {TestTest} from "./test.jsd"
import {render} from "@dlightjs/dlight";
// import {MyComp} from "./transpiler.tsd";
// // @ts-ignore
// import {SubElement} from "./example/test.jsd"
// @ts-ignore
// import {Benchmark} from "./example/performance/benchmark.tsd"
// import {Benchmark} from "./example/performance/benchmark.jsx";
// // console.log(t2-t1)
// import {HH} from "./test.jsx"
// import {NodeTest} from "./example/features/node.jsd"
// @ts-ignore
// import {MyComp} from "./test.jsd";
// import {StackTest} from "./stack.tsd";
// import {TestConcurr} from "./testConcurr.tsd"
// import {RouteTest} from "./Router.tsd";
import {TransitionTest} from "./transition.tsd";

render("app", TransitionTest)


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
//     bindParentNode(j._$nodes, j)
//     resolveEnvs(j._$nodes, j)
//     initNodes(j._$nodes)
//     // j._$init()
//     b.push(j)
// }



