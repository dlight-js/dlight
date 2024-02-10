import {
  View,
  type Typed,
  type Pretty,
  div,
  section,
  header,
  h1,
  input,
  label,
  ul,
  SubTyped,
  button,
  li,
  footer,
  span,
  strong,
  a,
} from "@dlightjs/dlight"

interface ToDo {
  id: number
  title: string
  completed: boolean
}

interface ToDoItemProps {
  id: number
  editing: boolean
  title: string
  completed: boolean
}

type Filter = "all" | "active" | "completed"

@View
class ToDoMVC {
  todos: ToDo[] = []

  editingId: number | null = null

  editingText = ""

  remainingCount = this.todos.filter(todo => !todo.completed).length

  showMode: Filter = (location.hash.slice(2) as Filter) || "all"

  filteredTodos = this.todos.filter(todo => {
    switch (this.showMode) {
      case "active":
        return !todo.completed
      case "completed":
        return todo.completed
      default:
        return true
    }
  })

  addTodo({ target, key }: KeyboardEvent) {
    const title = (target as HTMLInputElement).value.trim()
    if (key === "Enter" && title) {
      this.todos.push({
        id: performance.now(),
        title,
        completed: false,
      })
      ;(target as HTMLInputElement).value = ""
    }
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  toggleTodo(id: number) {
    const idx = this.todos.findIndex(todo => todo.id === id)
    this.todos[this.todos.findIndex(todo => todo.id === id)].completed =
      !this.todos[idx].completed
  }

  doneEditing(id: number) {
    const idx = this.todos.findIndex(todo => todo.id === id)
    this.todos[idx].title = this.editingText
    this.editingId = null
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed)
  }

  locationHandler() {
    this.showMode = (location.hash.slice(2) as Filter) || "all"
  }

  willMount() {
    window.addEventListener("hashchange", this.locationHandler)
  }

  didUnmount() {
    window.removeEventListener("hashchange", this.locationHandler)
  }

  @View
  ToDoItem = (({ id, title, completed, editing }: ToDoItemProps) => {
    li().class(
      `todo ${editing ? "editing" : ""} ${completed ? "completed" : ""}`.trim()
    )
    {
      div().class("view")
      {
        input()
          .class("toggle")
          .type("checkbox")
          .checked(completed)
          .onClick(e => {
            e.preventDefault()
            this.toggleTodo(id)
          })
        label(title).onDblClick(() => {
          this.editingText = title
          this.editingId = id
        })
        button()
          .class("destroy")
          .onClick(() => {
            this.removeTodo(id)
          })
      }
      if (editing) {
        input()
          .class("edit")
          .value(this.editingText)
          .onInput(e => {
            this.editingText = (e.target as HTMLInputElement).value
          })
          .onBlur(() => this.doneEditing(id))
          .onKeyDown(e => {
            if (e.key === "Enter") this.doneEditing(id)
          })
          .element(el => {
            setTimeout(() => el.focus())
          })
      }
    }
  }) as Pretty as SubTyped<ToDoItemProps>

  @View
  Footer() {
    footer().class("footer")
    {
      span().class("todo-count")
      {
        strong(this.remainingCount)
        ;` ${this.remainingCount > 1 ? "items" : "item"} left`
      }
      ul().class("filters")
      {
        li()
        {
          a("All")
            .class(this.showMode === "all" ? "selected" : "")
            .href("#/")
        }
        li()
        {
          a("Active")
            .class(this.showMode === "active" ? "selected" : "")
            .href("#/active")
        }
        li()
        {
          a("Completed")
            .class(this.showMode === "completed" ? "selected" : "")
            .href("#/completed")
        }
      }
      if (this.remainingCount !== this.todos.length) {
        button("Clear completed")
          .class("clear-completed")
          .onClick(this.clearCompleted)
      }
    }
  }

  View() {
    section().class("todoapp")
    {
      header().class("header")
      {
        h1("todos")
        input()
          .class("new-todo")
          .placeholder("What needs to be done?")
          .autofocus(true)
          .onKeyDown(this.addTodo)
      }
      if (this.todos.length > 0) {
        section().class("main")
        {
          input().id("toggle-all").class("toggle-all").type("checkbox")
          label().for("toggle-all")
          ul().class("todo-list")
          {
            for (const { id, title, completed } of this.filteredTodos) {
              this.ToDoItem()
                .id(id)
                .title(title)
                .completed(completed)
                .editing(this.editingId === id)
            }
          }
        }
        this.Footer()
      }
    }
  }
}

export default ToDoMVC as Pretty as Typed
