import {View} from "@dlightjs/dlight"

export class TaskCard extends View {
  @Prop task
  @Prop deleteTask
  @Prop toggleBox
  didMount() {
    console.log(`[didAppear] Loaded task named ${this.task.name}, it is${this.task.finished?"":" not"} finished.`)
  }
  didUnmount() {
    console.log(`[didUnMount] Unmount task named ${this.task.name}, it is${this.task.finished?"":" not"} finished.`)
  }
  handleChange = e => {
    if (e.target.checked !== this.task.finished) {
      this.toggleBox(e.target.checked, this.task)
    }
  }

  Body=(
    <>
      <div>
        <input type={"checkbox"} checked={this.task.finished} onchange={this.handleChange} />
      </div>
      <span style={{margin:"0 5px", textDecoration:this.task.finished ? "line-through" : "none"}}>{this.task.name}</span>
      <button onclick={()=>this.deleteTask(this.task)} style={{padding: "5px"}}>delete</button>
    </>
  )
}
