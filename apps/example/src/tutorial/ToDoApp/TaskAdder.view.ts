// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View } from "@dlightjs/dlight"
import { type Typed, input, button, Prop } from "@dlightjs/types"
import { type Task } from "./Task"

class TaskAdder extends View {
  @Prop tasks: Prop<Task[]> = [] as any
  inputText = ""
  inputEl?: HTMLInputElement

  Body() {
    input()
      .value(this.inputText)
      .oninput(e => {
        this.inputText = (e.target as any).value
      })
      .element(this.inputEl)

    button("add")
      .onclick(() => {
        this.tasks = [...this.tasks, { name: this.inputText, finished: false }] as any
        this.inputText = ""
        this.inputEl!.focus()
      })
  }
}

export default TaskAdder as any as Typed<TaskAdder>
