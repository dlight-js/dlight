declare enum DLNodeType {
    HTML = 0,
    Text = 1,
    Custom = 2,
    For = 3,
    If = 4,
    Env = 5,
    Expression = 6
}
declare class DLNode {
    /**
     * @member _$id
     *      - 每一个Node都有id
     * @member _$nodeType
     *      - 每一个Node都有具体的type，是一个枚举
     *      - enum DLNodeType {
     *          HTML, Text, Custom, For, If, Env
     *        }
     *      - 只提供基础类如HTML/Text，自定义类Dlight/Env，控制流类For/If
     *
     * @member _$nodes
     *      - 所有嵌套Node的抽象表示，就是个ast
     * @member _$el
     *      - 代表真实DOM上面的node，只有TextNode和HtmlNode有实体node
     * @method _$init
     *      - 这之前nodes和el都必须生成，flow需要更新整体结构
     * @method _$render
     *      - 传入parentEl，将_$nodes append上去
     *
     *
     * @pipeline
     * html: A; dlight: B; flow: C
     * 嵌套调用：A1 { A2 { B1 { B2 { C1 { C2 } } } } }
     * A1.construct <- A2.construct <- B1.construct <- B2.construct <- C1.construct <- C2.construct
     * A1._$init -> A2._$init -> B1._$init -> B2._$init -> C1._$init -> C2._$init
     *           ↳ A2.render  ↳ B1.render
     * A1.render (A => Stop  B/C => B/C.render)
     *
     * @hint
     * 所有的nodes初始化必须在construct阶段，除了customNode，因为customNode一旦call了Body，就没法进行额外操作了
     * 所有的bindNodes都必须在init中进行，保证子的init都可以访问到父parentNode
     */
    _$nodeType: DLNodeType;
    private __$el;
    get _$el(): Node | HTMLElement | any;
    set _$el(value: Node | HTMLElement | any);
    _$parentNode?: DLNode;
    _$nodes: DLNode[];
    _$depObjectIds: Object[];
    _$beforeInitSubNodes(): void;
    _$addBeforeInitSubNodes(func: () => any): void;
    _$bindNodes(): void;
    constructor(nodeType: DLNodeType);
    _$init(): void;
    render(parentEl: HTMLElement): void;
}

declare class EnvNode extends DLNode {
    addPropFuncs: ((node: CustomNode) => any)[];
    constructor();
    _$addNodes(nodes: DLNode[]): void;
    _$addProp(key: string, propOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]): void;
    addProps(node: CustomNode): void;
    addPropsToNodes(node: DLNode): void;
    _$init(): void;
    render(parentEl: HTMLElement): void;
}

/**
 * 整个依赖只有两种
 * State和Derived
 * @State
 *      1. 强制用state decorator来装饰
 *      2. 从prop中isTwoWayConnected导出的，可能是prop/dotProp/env
 * @Derived
 *      无显示装饰器
 *      从depChain而来
 *      e.g.
 *      A: State, B = A + 1, C = B + 1
 *      则depChain为 A -> B -> C
 *      这时 B/C 以及 derived from B/C 的都可以被监听到
 * @Prop
 *      外部传入的参数，有三种情况
 *          1. 里面Prop => 外面不管传什么都是里面监听外面改变
 *          2. 里面PropState + 外面State/PropState => 直接map过去互相改变
 *          3. 里面PropState + 外面是普通的或者derived => 里面是个State，同时监听外面改变
 *      传参数有三种方式（加上env有4种）
 *          1. MyComp({prop1: xx, prop2: xx})
 *             class MyComp extend View {
 *                 @Prop prop1 = defaultProp1
 *                 @Prop prop2
 *             }
 *          2. MyComp()
 *                  .prop1(xxx)
 *                  .prop2(xxx)
 *             class MyComp extend View {
 *                 @Prop prop1 = defaultProp1
 *                 @Prop prop2
 *             }
 *          1. MyComp(props)
 *             class MyComp extend View {
 *                 // 必须用_$content 来接
 *                 @Prop _$content
 *             }
 * @Children
 *          一般不会用到children，只有在写到组件库时候要用到，比如:
 *              MyComp() {
 *                  MyNestedComp1()
 *                  MyNestedComp2()
 *              }
 *          这时候，MyNestedComp1和MyNestedComp2就会放到this._$children里面
 *          如果想要把这些nodes转化放到body里面，用提供的Nodes或者Node容器，如：
 *          class MyComp extends View{
 *              Body() {
 *                  Nodes(this._$children)
 *                  div("other stuff")
 *              }
 *          }
 * @Pipeline
 *      new constructor()（初始化不在depChain上的member）
 *      等待外部调用 initNodes([this]) 或者 this._$init()
 *   -> this._$initDecorators()（生成depChain，补齐剩下的参数）
 *   -> this.Preset()（留的hook)
 *   -> this.Body()（run Body函数并挂到this._$nodes上）
 *   -> bindParentNode()（把刚生成的nodes的_$parentNode指向自己）
 *   -> initNodes()（递归init刚生成的nodes）
 *   -> this.Afterset（留的hook，目前只有.element()会调用)
 */
declare class CustomNode extends DLNode {
    _$deps: {
        [key: string]: Map<Object, () => any>;
    };
    _$envNodes?: EnvNode[];
    _$derivedPairs?: {
        [key: string]: string[];
    };
    _$children?: DLNode[];
    _$tag: string;
    Body: () => never[];
    constructor();
    _$addAfterset(func: () => any): void;
    _$runDeps(depName: string): void;
    _$addChildren(nodes: DLNode[]): void;
    _$initDecorators(): void;
    _$addDeps(deps: string[], objectId: Object, func: (newValue?: any) => any): void;
    _$deleteDep(depName: string, objectId: Object): void;
    _$deleteDeps(objectId: Object): void;
    AfterConstruct(): void;
    Preset(): void;
    Afterset(): void;
    _$init(): void;
    _$addProp(key: string, propFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[], isTwoWayConnected?: boolean): void;
    render(parentEl: HTMLElement): void;
    willMount(_node?: CustomNode): void;
    didMount(_node?: CustomNode): void;
    willUnmount(_node?: CustomNode): void;
    didUnmount(_node?: CustomNode): void;
    _$addLifeCycle(func: (_node: CustomNode) => any, lifeCycleName: "willMount" | "didMount" | "willUnmount" | "didUnmount"): void;
}

declare class HtmlNode extends DLNode {
    _$envNodes?: EnvNode[];
    constructor(tag: string);
    _$init(): void;
    _$addNodes(nodes: DLNode[]): void;
    _$addProp(key: string, valueOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]): void;
    willAppear(_el?: HTMLElement): any;
    didAppear(_el?: HTMLElement): any;
    willDisappear(_el?: HTMLElement): any;
    didDisappear(_el?: HTMLElement): any;
    _$addLifeCycle(func: (el?: HTMLElement) => any, lifeCycleName: "willAppear" | "didAppear" | "willDisappear" | "didDisappear"): void;
    render(parentEl: HTMLElement): void;
}

declare class MutableNode extends DLNode {
    afterUpdateNewNodes(_nodes: DLNode[]): void;
    addAfterUpdateNewNodesFunc(func: (nodes: DLNode[]) => any): void;
    onUpdate(_prevNodes: DLNode[], _nodes: DLNode[]): void;
    addOnUpdateNodesFunc(func: (prevNodes: DLNode[], nodes: DLNode[]) => any): void;
    _$bindNewNodes(nodes: DLNode[]): void;
}

declare class ForNode extends MutableNode {
    keys: any[];
    array: any[];
    _$nodess: DLNode[][];
    nodeFunc?: (key: any, idx: number, forNode: any) => DLNode[];
    keyFunc?: () => any[];
    arrayFunc?: () => any[];
    dlScope?: CustomNode;
    listenDeps?: string[];
    _$envNodes?: EnvNode[];
    constructor();
    duplicatedOrNoKey: boolean;
    _$getItem(key: any, idx: number): any;
    /**
     * @methodGroup - 只有有deps的时候才需要用各种func
     */
    _$addNodeFunc(nodeFunc: (key: any, idx: number, forNode: any) => DLNode[]): void;
    _$addKeyFunc(keyFunc: (() => any[])): void;
    _$addArrayFunc(dlScope: CustomNode, arrayFunc: any | (() => any), listenDeps: string[]): void;
    /**
     * @methodGroup - 无deps的时候直接加nodes
     */
    _$addNodess(nodess: DLNode[][]): void;
    setArray(): void;
    setKeys(): void;
    _$init(): void;
    render(parentEl: HTMLElement): void;
    getNewNodes(key: any, idx: number): DLNode[];
    /**
     * 没有key这样是优化过的，非常快
     */
    updateWithOutKey(parentNode: HtmlNode): void;
    /**
     * 有 key，三步走
     *
     */
    updateWithKey(parentNode: HtmlNode): Promise<void>;
    _$listen(dlScope: CustomNode, itemFunc: () => any, listenDeps: string[], updateFunc: any): void;
}

interface ConditionPair {
    condition: () => boolean;
    node: () => DLNode[];
}
declare class IfNode extends MutableNode {
    conditionPairs: ConditionPair[];
    condition?: string;
    listenDeps: string[];
    dlScope?: CustomNode;
    _$envNodes?: EnvNode[];
    constructor();
    _$addCond(condition: () => boolean, node: () => DLNode[], dlScope?: CustomNode, listenDeps?: string[]): void;
    _$init(): void;
    update(parentNode: HtmlNode): void;
    render(parentEl: HTMLElement): void;
}

declare class TextNode extends DLNode {
    constructor(textOrFunc: string | (() => string), dlScope?: CustomNode, listenDeps?: string[]);
    render(parentEl: HTMLElement): void;
}

type ExpressionNodeType = DLNode | DLNode[];
declare class ExpressionNode extends MutableNode {
    nodeOrFunc?: () => ExpressionNodeType;
    listenDeps?: string[];
    dlScope?: CustomNode;
    propFuncs: (() => any)[];
    propScope: ((el: HTMLElement, node: DLNode) => boolean);
    deepLoopEl: boolean;
    constructor(nodeOrFunc: ExpressionNodeType | (() => ExpressionNodeType), dlScope?: CustomNode, listenDeps?: string[]);
    _$onUpdateNodes(func: () => any): void;
    _$addProp(key: string, valueOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]): void;
    formatNodes(nodes: any): any;
    _$init(): void;
    render(parentEl: HTMLElement): void;
    update(parentNode: HtmlNode): void;
    willMount(_node?: ExpressionNode): void;
    didMount(_node?: ExpressionNode): void;
    willUnmount(_node?: ExpressionNode): void;
    didUnmount(_node?: ExpressionNode): void;
    _$addLifeCycle(func: (_node: ExpressionNode) => any, lifeCycleName: "willMount" | "didMount" | "willUnmount" | "didUnmount"): void;
}

declare function initNodes(nodes: DLNode[] | DLNode[][]): void;
declare function bindParentNode(nodes: DLNode[] | DLNode[][], parentNode: DLNode): void;
declare function loopNodes(nodes: DLNode[], runFunc: (node: DLNode) => boolean): void;
declare function loopEls(nodes: DLNode[], runFunc: (el: HTMLElement, node: HtmlNode) => void, deep?: boolean): void;
declare function toEls(nodes: DLNode[]): HTMLElement[];

declare const View: typeof CustomNode;
declare const required: any;
declare function render(idOrEl: string | HTMLElement, dl: CustomNode): void;

export { CustomNode, DLNode, DLNodeType, EnvNode, ExpressionNode, ForNode, HtmlNode, IfNode, TextNode, View, bindParentNode, initNodes, loopEls, loopNodes, render, required, toEls };
