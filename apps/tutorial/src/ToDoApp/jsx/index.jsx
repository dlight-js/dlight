import {View} from "@dlightjs/dlight";
import {TaskCard} from "./TaskCard.jsx";
import {TaskAdder} from "./TaskAdder.jsx";

export class ToDoApp extends View {
  @State tasks = []
  unfinishedNum = this.tasks.filter(t=>!t.finished).length

  watchUnfinishedNum = function() {
    console.log(`remain ${this.unfinishedNum} tasks to do`)
  }.call(this)

  deleteTask = (task) => {
    this.tasks = this.tasks.filter(t=>t !== task)
  }

  toggleBox = (checked, task) => {
    task.finished = checked
    this.tasks = [...this.tasks]
  }

  Body = (
      <>
        <h1>ToDo App in DLight.js</h1>
        <h2>What needs to be done?</h2>

        <TaskAdder tasks={this.tasks}/>

        <h2>
          {
            this.unfinishedNum === 0
              ? "You've finished all tasks！"
              : `Remaining ${this.unfinishedNum} tasks to do.`
          }
        </h2>
        {
          this.tasks.map(task => (
            <TaskCard task={task} deleteTask={this.deleteTask} toggleBox={this.toggleBox} />
          ))
        }
        </>
      )

}
