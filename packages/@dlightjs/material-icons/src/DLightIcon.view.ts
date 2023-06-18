
class MyIcon extends View {
    @Prop path = required
    @Prop width: Prop<number> = 24 as any
    @Prop height: Prop<number> = 24 as any
    @Prop viewBox: Prop<string> = "0 0 24 24" as any
    @Prop opacity: Prop<string> = undefined as any
    @Prop fontSize: Prop<string> = undefined as any
  
    Body() {
      span()
        .innerHTML(`<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}" viewBox="${this.viewBox}"><path d="${this.path}"/></svg>`)
    }
  }