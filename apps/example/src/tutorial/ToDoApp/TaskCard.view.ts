import { View } from "@dlightjs/dlight"
import { type Typed, Prop, div, input, span, button, required, type RequiredProp } from "@dlightjs/types"
import { type Task } from "./Task"

class TaskCard extends View {
  @Prop task: RequiredProp<Task> = required
  @Prop deleteTask: RequiredProp<() => any> = required
  @Prop toggleBox: RequiredProp<(checked: any) => any> = required
  didMount() {
    console.log(`[didMount] Loaded task named ${this.task.name}, it is${this.task.finished ? "" : " not"} finished.`)
  }

  didUnmount() {
    console.log(`[didUnMount] Unmount task named ${this.task.name}, it is${this.task.finished ? "" : " not"} finished.`)
  }

  Body() {
    div()
      ._padding("5px")
    {
      input()
        .type("checkbox")
        .checked(this.task.finished)
        .onchange(e => {
          const checked = (e.target as any).checked
          if (checked !== this.task.finished) {
            this.toggleBox(checked)
          }
        })
      span(this.task.name)
        ._margin("0 5px")
        ._textDecoration(this.task.finished ? "line-through" : "none")
      button("delete")
        .onclick(this.deleteTask)
    }
  }
}

export default TaskCard as any as Typed<TaskCard>
