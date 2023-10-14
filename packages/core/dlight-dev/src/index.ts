import * as Nodes from "./Nodes"
import * as Utils from "@dlightjs/dlight"
export default Nodes
export * from "./Nodes"

export const $ = Utils.$
export const Children = Utils.Children
export const Content = Utils.Content
export const DLNodeType = Utils.DLNodeType
export const Env = Utils.Env
export const Prop = Utils.Prop
export const Static = Utils.Static
export const View = Nodes.CustomNode as typeof Nodes.CustomNode & ((...args: any) => any)
export const Watch = Utils.Watch
export const _ = Utils._
export const addDLProp = Utils.addDLProp
export const addOneWayDLProp = Utils.addOneWayDLProp
export const bindParentNode = Utils.bindParentNode
export const env = Utils.env
export const escape = Utils.escape
export const forwardDLProp = Utils.forwardDLProp
export const htmlTag = Utils.htmlTag
export const initNodes = Utils.initNodes
export const loopEls = Utils.loopEls
export const loopNodes = Utils.loopNodes
export const manual = Utils.manual
export const render = Utils.render
export const renderToString = Utils.renderToString
export const required = Utils.required
export const tag = Utils.tag
export const toEls = Utils.toEls
