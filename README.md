# TODO
- [x] conditional
```typescript
`
div {
    div("ok")
    if (this.flag) {
        div("yes")
    } else {
        div("no")
    }
    div('okk')
}
`
const el0 = $createEl("div");
const el1 = $createEl("div");
const [lp1_innerText, vf1_innerText] = $genePropFunc(this, "\"ok\"");
$addProp(this, el1, "innerText", lp1_innerText, eval(vf1_innerText));
el0.appendChild(el1);


```
- [ ] for each
- [ ] prop
- [ ] dot prop
- [ ] 简写style ._height