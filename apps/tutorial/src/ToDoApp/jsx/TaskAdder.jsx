import {View} from "@dlightjs/dlight"

export class TaskAdder extends View {
  @State inputText = ""
  @PropState tasks = []
  inputEl

    handleInput = e => {
        this.inputText = e.target.value
    }
    // handleAdd =
  Body=(
      <>
          <input value={this.inputText} oninput={this.handleInput} ref={this.inputEl}/>

          <button onclick={() => {
              this.tasks = [...this.tasks, {name: this.inputText, finished: false}]
              this.inputText = ""
              console.log(this.inputEl,'hhh')
              this.inputEl.focus()
          }}>add</button>

      </>
 )
}
