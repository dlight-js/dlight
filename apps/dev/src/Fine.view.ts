import { Pretty, Typed, View, button, div, form, input } from "@dlightjs/dlight"

@View
class App {
  tags = new Set(["dlight"])
  appendedTags = new Set<string>([""])

  handleDeleteTag(tag: string) {
    this.tags.delete(tag)
  }

  View() {
    form().onSubmit(e => {
      e.preventDefault()

      const target = e.target as HTMLFormElement
      const formData = new FormData(target)
      const tag = String(formData.get("tag"))

      this.tags.add(tag)
      target.reset()
    })
    {
      input().name("tag").placeholder("add a tag")
      button("add")
    }
    div()
    {
      for (const tag of Array.from(this.tags)) {
        button(tag)
          .draggable(true)
          .onClick(() => this.handleDeleteTag(tag))
          .onDragStart(e => {
            if (!e.dataTransfer) return
            e.dataTransfer.setData("text/plain", tag)
          })
      }
    }
    div()
      .style({
        width: "200px",
        height: "200px",
        border: "1px solid black",
      })
      .onDrop(e => {
        e.preventDefault()
        if (!e.dataTransfer) return

        e.dataTransfer.dropEffect = "move"
        const data = e.dataTransfer.getData("text/plain")
        this.appendedTags.add(data)
      })
      .onDragOver(e => {
        e.preventDefault()
        if (!e.dataTransfer) return

        e.dataTransfer.dropEffect = "move"
      })
    {
      for (const tag of Array.from(this.appendedTags)) {
        div(tag)
      }
    }
  }
}

export default App as Pretty as Typed
