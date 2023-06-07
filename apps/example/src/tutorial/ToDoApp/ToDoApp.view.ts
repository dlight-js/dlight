// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View } from "@dlightjs/dlight"
import TaskCard from "./TaskCard.view"
import TaskAdder from "./TaskAdder.view"
import { type Task } from "./Task"
import { type Typed, h1, h2 } from "@dlightjs/types"

class ToDoApp extends View {
  tasks: Task[] = []
  unfinishedNum: number = this.tasks.filter(t => !t.finished).length

  watchUnfinishedNum = (function() {
    console.log(`remain ${this.unfinishedNum} tasks to do`)
  }.call(this))

  Body() {
    h1("ToDo App in DLight.js")
    h2("What needs to be done?")

    TaskAdder()
      .tasks(this.tasks)

    h2(this.unfinishedNum === 0 ? "You've finished all tasks!" : `Remaining ${this.unfinishedNum} tasks to do.`)

    for (const task of this.tasks) {
      [task]
      TaskCard()
        .task(task)
        .deleteTask(() => {
          this.tasks = this.tasks.filter(t => t !== task)
        })
        .toggleBox((checked) => {
          task.finished = checked
          this.tasks = [...this.tasks]
        })
    }
  }
}

export default ToDoApp as any as Typed<ToDoApp>
