// @ts-ignore
import {ToDoApp} from "./example/ToDoApp/index.tsd";
// @ts-ignore
import {Benchmark} from "./example/benchmark.tsd";
// @ts-ignore
import {TestElement} from "./example/el1.tsd";
import {render} from "./core/utils";
import {IfTest, ForTest, FlowTest, EnvTest, LifeCycleTest} from "./example/features"

export {}

// render("#app", new Benchmark())


enum TestType {
    Benchmark, If, For, Flow, Env, ToDo, LifeCycle
}

let testType: TestType = TestType.Benchmark


switch (testType) {
    case TestType.ToDo:
        render("#app", new ToDoApp())
        break
    case TestType.Benchmark:
        render("#app", new Benchmark())
        break
    case TestType.If:
        render("#app", new IfTest())
        break
    case TestType.For:
        render("#app", new ForTest())
        break
    case TestType.Flow:
        render("#app", new FlowTest())
        break
    case TestType.Env:
        render("#app", new EnvTest())
        break
    case TestType.LifeCycle:
        render("#app", new LifeCycleTest())
        break
}
