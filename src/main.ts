// @ts-ignore
import {ToDoApp} from "./example/ToDoApp/index.tsd";
// @ts-ignore
import {Benchmark} from "./example/benchmark.tsd";
// @ts-ignore
import {TestElement} from "./example/el1.tsd";
import {render} from "./core/utils";


export {}

// render("#app", new Benchmark())
render("#app", new TestElement())
// render("#app", new ToDoApp())
