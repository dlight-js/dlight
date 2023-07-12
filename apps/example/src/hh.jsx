import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"

const ESCAPE_KEY = 27
const ENTER_KEY = 13

const setFocus = (el) => setTimeout(() => el.focus())

const LOCAL_STORAGE_KEY = "todos-solid"
function useLocalStore(value) {
  // load stored todos on init
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
  const [store, setStore] = useState(stored ? JSON.parse(stored) : value)

  // JSON.stringify creates deps on every iterable field
  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store)),
    [store]
  )
  return [store, setStore]
}

const TodoItem = ({
  todo,
  store,
  toggle,
  setEditing,
  removeTodo,
  save,
  doneEditing
}) => {
  return (
    <li
      class="todo"
      classList={{
        editing: store.editingTodoId === todo.id,
        completed: todo.completed
      }}
    >
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          checked={todo.completed}
          onInput={(e) => toggle(todo.id, e)}
        />
        <label onDblClick={() => setEditing(todo.id)}>{todo.title}</label>
        <button class="destroy" onClick={() => removeTodo(todo.id)} />
      </div>
      {store.editingTodoId === todo.id && (
        <input
          class="edit"
          value={todo.title}
          onFocusOut={() => save(todo.id)}
          onKeyUp={() => doneEditing(todo.id)}
          ref={setFocus}
        />
      )}
    </li>
  )
}

const TodoApp = () => {
  const [store, setStore] = useLocalStore({
    counter: 1,
    todos: [],
    showMode: "all",
    editingTodoId: null
  })
  const remainingCount = useMemo(
    () =>
      store.todos.length - store.todos.filter((todo) => todo.completed).length
  )
  const filterList = (todos) => {
    if (store.showMode === "active") {
      return todos.filter((todo) => !todo.completed)
    } else if (store.showMode === "completed") {
      return todos.filter((todo) => todo.completed)
    } else return todos
  }
  const removeTodo = (todoId) =>
    setStore((s) => ({
      ...s,
      todos: s.todos.filter((item) => item.id !== todoId)
    }))
  const editTodo = (todo) =>
    setStore((s) => ({
      ...s,
      todos: s.todos.map((item) => {
        if (item.id !== todo.id) return item
        return { ...item, ...todo }
      })
    }))
  const clearCompleted = () =>
    setStore((s) => ({
      ...s,
      todos: s.todos.filter((todo) => !todo.completed)
    }))
  const toggleAll = (completed) =>
    setStore((s) => ({
      ...s,
      todos: s.todos.map((todo) => {
        if (todo.completed === completed) return todo
        return { ...todo, completed }
      })
    }))
  const setEditing = (todoId) => setStore((s) => ({ ...s, editingTodoId: todoId }))
  const addTodo = ({ target, keyCode }) => {
    const title = target.value.trim()
    if (keyCode === ENTER_KEY && title) {
      setStore((s) => ({
        ...s,
        todos: [
          { title, id: store.counter, completed: false },
          ...store.todos
        ],
        counter: store.counter + 1
      }))
      target.value = ""
    }
  }
  const save = (todoId, { target: { value } }) => {
    const title = value.trim()
    if (store.editingTodoId === todoId && title) {
      editTodo({ id: todoId, title })
      setEditing()
    }
  }
  const toggle = (todoId, { target: { checked } }) =>
    editTodo({ id: todoId, completed: checked })
  const doneEditing = (todoId, e) => {
    if (e.keyCode === ENTER_KEY) save(todoId, e)
    else if (e.keyCode === ESCAPE_KEY) setEditing()
  }

  const locationHandler = () =>
    setStore((s) => ({ ...s, showMode: location.hash.slice(2) || "all" }))

  useEffect(() => {
    window.addEventListener("hashchange", locationHandler)
    return () => window.removeEventListener("hashchange", locationHandler)
  })

  return (
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={addTodo}
        />
      </header>

      {store.todos.length > 0 && (
        <>
          <section class="main">
            <input
              id="toggle-all"
              class="toggle-all"
              type="checkbox"
              checked={!remainingCount}
              onInput={({ target: { checked } }) => toggleAll(checked)}
            />
            <label for="toggle-all" />
            <ul class="todo-list">
              {filterList(store.todos).map((todo) => (
                <TodoItem
                  {...{
                    todo,
                    store,
                    toggle,
                    setEditing,
                    removeTodo,
                    save,
                    doneEditing
                  }}
                />
              ))}
            </ul>
          </section>

          <footer class="footer">
            <span class="todo-count">
              <strong>{remainingCount}</strong>{" "}
              {remainingCount === 1 ? " item " : " items "} left
            </span>
            <ul class="filters">
              <li>
                <a href="#/" classList={{ selected: store.showMode === "all" }}>
                  All
                </a>
              </li>
              <li>
                <a
                  href="#/active"
                  classList={{ selected: store.showMode === "active" }}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  href="#/completed"
                  classList={{ selected: store.showMode === "completed" }}
                >
                  Completed
                </a>
              </li>
            </ul>
            {remainingCount !== store.todos.length && (
              <button class="clear-completed" onClick={clearCompleted}>
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </section>
  )
}

ReactDOM.render(<TodoApp />, document.getElementById("root"))
