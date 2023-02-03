import {View} from "@dlightjs/dlight"

export class TaskAdder extends View {
  @State inputText = ""
  @PropState tasks = []
  inputEl

    handleInput = e => {
        this.inputText = e.target.value
    }
    handleAdd = () => {
                  this.tasks = [...this.tasks, {name: this.inputText, finished: false}]
                  this.inputText = ""
                  this.inputEl.focus()
              }
  Body=(
      <>
          <input value={this.inputText} oninput={this.handleInput} element={this.inputEl}/>

          <button onclick={this.handleAdd}>add</button>

      </>
 )
}
