# 设计模式


|            | _$id        | _$el                                    | _$nodes                                 | _$dlScope  |
|------------|-------------|-----------------------------------------|-----------------------------------------|------------|
|            | 每一个Node都有id | 代表DOM上面的node，只有TextNode和HtmlNode有实体node | ，由于TextNode没有children，所以没有 | 对于需要更新的，需要 |
| TextNode   | yes         | yes                                     | /                                       |            |
| HtmlNode   | yes         | yes                                     | yes                                     |            |
| DlightNode | yes         | /                                       | yes                                     |            |
| EnvNode    | yes         | /                                       | yes                                     |            |
| IfNode     | yes         | /                                       | yes                                     |            |
| ForNode    | yes         | /                                       | yes                                     |            |

|            | constructor | _$putId | beforeInit | _$init                                                                                | _$update     | render                       |
|------------|-------------|---------|------------|---------------------------------------------------------------------------------------|--------------|------------------------------|
|            | 只id         |         | 收集参数和监听    | 这之前nodes和el都必须生成                                                                      | flow需要更新整体结构 | 传入parentEl，将_$nodes append上去 |
| TextNode   | 生成_$el      |         | /          | /                                                                                     | /            |                              |
| HtmlNode   |             |         |            | 收集node                                                                                | /            |                              |
| DLightNode |             |         |            | 运行Body()，生成_$nodes                                                                    | /            |                              |
| EnvNode    |             |         |            |                                                                                       | /            |                              |
| IfNode     |             |         ||            | 传入parentEl和到此之前的beforeNodes，通过对beforeNodes里面遍历，拿到前面共有多少个元素，以此来parentEl.insertBefore() |              |
| ForNode    |             | 收集key和  |            |                                                                                       |              |                              |
