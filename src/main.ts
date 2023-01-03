import {ToDoApp} from "./example/ToDoApp/index.tsd";
import {Benchmark} from "./example/benchmark.tsd";
import {render} from "./core/utils";


export {}

// render("#app", new Benchmark())
render("#app", new ToDoApp())



