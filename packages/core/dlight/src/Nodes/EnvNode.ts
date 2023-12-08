import { type CustomNode } from "./CustomNode"
import { DLNode, DLNodeType } from "./DLNode"
import { addDLProp } from "../utils/prop"
import { type ValueOrFunc } from "./type"

export class EnvNode extends DLNode {
  constructor() {
    super(DLNodeType.Env)
  }

  _$init() {
    this.addEnvsToNodes(this._$nodes)
    this._$bindNodes()
  }

  /**
   * @brief Add envs to nodes, called before bind nodes,
   *  recursively add envs to sub nodes
   * @param nodes
   * @param avoidKeys Used to avoid override with nested envs,
   *  because the fact that
   *    1. nested envs will be outside in and that's correct
   *    2. some children nodes haven't been added to parent node yet
   *       due to our lazy init in _$init function strategy
   *  so we need to addEnvsToNodes recursively in child nodes' beforeInitSubNodes function,
   *  which will cause override from upper envs, so we need to avoid that.
   *  Here we use avoidKeys which indicates the keys that are already used in an inner env,
   *  i.e. inner envs' addEnvFuncMap's keys,
   *  in order to both avoid override and reduce unnecessary addDLProp calls
   *
   *  In case I forget the calling order, e.g. env1() { env2() { div1() } }
   *                                     env2.addEnvFunc  div1.addEnvFunc
   *      env1._$nodes = [env2]       // []               []
   *   -> env1._$init()               // []               []
   *   // won't be added to div1 because div1 hasn't been added to env1 yet
   *   -> env1.addEnvsToNodesTo(env2) // [env1Add]        []
   *   -> env2._$init()               // [env1Add]        []
   *   -> env2.addEnvsToNodesTo(div1) // [env1Add]        [env2Add]
   *   -> env2._$beforeInitSubNodes() // [env1Add]        [env2Add]
   *   // will be called because it's stored in env2's beforeInitSubNodes function
   *   -> env1.addEnvsToNodesTo(div)  // [env1Add]        [env2Add, env1Add]
   *
   *  So in this case, in the end the div1's env collection order will be first env2Add then env1Add,
   *  which will lead to the inner env(env2) being override by the outer env(env1).
   *  This is why we add avoidKeys to avoid override.
   */
  addEnvsToNodes(nodes: DLNode[], avoidKeys: string[] = []) {
    nodes.forEach(node => {
      if (node._$nodeType === DLNodeType.Env) {
        // ---- Can't avoid to use closure here because we need to pass avoidKeys to inner envs
        //      if we use similar strategy as HTMLNode's prevValue
        const newAvoidKeys = [...avoidKeys, ...Object.keys((node as EnvNode).addEnvFuncMap)]
        node._$collectEnvFuncs.push([this, newAvoidKeys])
        return
      }
      node._$collectEnvFuncs.push([this, avoidKeys])
      if (node._$nodeType === DLNodeType.Custom) {
        Object.entries(this.addEnvFuncMap).forEach(([key, addPropFunc]) => {
          if (avoidKeys.includes(key)) return
          addPropFunc(node as CustomNode)
        })
      }
    })
  }

  /**
   * @brief Env functions map that will be called in _$init
   */
  addEnvFuncMap: Record<string, (node: CustomNode) => void> = {}

  /**
   * @brief Add one prop the this.addEnvFuncMap, manually called in Body
   *  Inside onePropFunc, call addDLProp with "env" tag to add environmental property
   * @param key
   * @param propOrFunc
   * @param dlScope
   * @param dependencies
   */
  p(key: string, propOrFunc: ValueOrFunc, dlScope?: CustomNode, dependencies?: string[]) {
    this.addEnvFuncMap[key] = node => { addDLProp(node, "env", key, propOrFunc, dlScope, dependencies) }
  }
}
