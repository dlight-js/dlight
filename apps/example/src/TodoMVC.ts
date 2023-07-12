import { View } from "@dlightjs/dlight"
import { a, button, div, footer, h1, header, input, label, li, section, span, strong, ul } from "@dlightjs/types"

const ESCAPE_KEY = 27
const ENTER_KEY = 13

export class TodoApp extends View {
  counter = 1
  todos = []
  showMode = "all"
  editingTodoId = null

  remainingCount = this.todos.length - this.todos.filter((todo) => todo.completed).length
  filterList = (() => {
    if (this.showMode === "active") {
      return this.todos.filter((todo) => !todo.completed)
    } else if (this.showMode === "completed") {
      return this.todos.filter((todo) => todo.completed)
    } else {
      return this.todos
    }
  })()

  removeTodo(todoId) {
    this.todos = [...this.todos.filter(item => item.id !== todoId)]
  }

  editTodo(todo) {
    this.todos = [...this.todos.map(item => {
      if (item.id !== todo.id) return item
      return { ...item, ...todo }
    })]
  }

  clearCompleted() {
    this.todos = [...this.todos.filter(todo => !todo.completed)]
  }

  toggleAll(completed) {
    this.todos = [...this.todos.map((todo) => {
      if (todo.completed === completed) return todo
      return { ...todo, completed }
    })]
  }

  setEditing(todoId) {
    this.editingTodoId = todoId
  }

  addTodo({ target, keyCode }) {
    const title = target.value.trim()
    if (keyCode === ENTER_KEY && title) {
      this.todos = [
        { title, id: this.counter, completed: false },
        ...this.todos
      ]
      this.counter++
      target.value = ""
    }
  }

  save(todoId, { target: { value } }) {
    const title = value.trim()
    if (this.editingTodoId === todoId && title) {
      this.editTodo({ id: todoId, title })
      this.setEditing()
    }
  }

  toggle(todoId, { target: { checked } }) {
    this.editTodo({ id: todoId, completed: checked })
  }

  doneEditing(todoId, e) {
    if (e.keyCode === ENTER_KEY) this.save(todoId, e)
    else if (e.keyCode === ESCAPE_KEY) this.setEditing()
  }

  locationHandler() {
    this.showMode = location.hash.slice(2) || "all"
  }

  didMount() {
    window.addEventListener("hashchange", this.locationHandler)
  }

  willUnmount() {
    window.removeEventListener("hashchange", this.locationHandler)
  }

  Body() {
    section()
      .className("todoapp")
    {
      header()
        .className("header")
      {
        h1("todos")
        input()
          .className("new-todo")
          .placeholder("What needs to be done?")
          .onkeydown(this.addTodo)
      }
      if (this.todos.length > 0) {
        section()
          .className("main")
        {
          input()
            .id("toggle-all")
            .className("toggle-all")
            .type("checkbox")
            .checked(!this.remainingCount)
            .oninput(({ target: { checked } }) => this.toggleAll(checked))
          label()
            .for("toggle-all")
          ul()
            .className("todo-list")
          {
            for (const { title, id, completed } of this.filterList) {
              li()
                .className([
                  "todo",
                  this.editingTodoId === id && "editing",
                  completed && "competed"
                ])
              {
                div()
                  .className("view")
                {
                  input()
                    .className("toggle")
                    .type("checkbox")
                    .checked(completed)
                    .oninput(e => this.toggle(id, e))
                  label(title)
                    .ondblclick(() => this.setEditing(id))
                  button()
                    .className("destroy")
                    .onclick(() => this.removeTodo(id))
                }
                if (this.editingTodoId === id) {
                  input()
                    .className("edit")
                    .value(title)
                    .onfocusout(() => this.save(id))
                    .onkeyup(e => this.doneEditing(id, e))
                    .element(el => {
                      setTimeout(() => el.focus())
                    })
                }
              }
            }
          }
        }
        footer()
          .className("footer")
        {
          span()
            .className("todo-count")
          {
            strong(this.remainingCount);
            `  item${this.remainingCount === 1 ? "" : "s"} left`
          }
          ul()
            .className("filters")
          {
            li()
            {
              a("All")
                .href("#/")
                .className(this.showMode && "all")
            }
            li()
            {
              a("Active")
                .href("#/active")
                .className(this.showMode && "active")
            }
            li()
            {
              a("Completed")
                .href("#/completed")
                .className(this.showMode && "completed")
            }
            if (this.remainingCount !== this.todos.length) {
              button("Clear completed")
                .className("clear0completed")
                .onclick(this.clearCompleted)
            }
          }
        }
      }
    }
  }
}
