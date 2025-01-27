type RequiredKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];

type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

type DataKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

type RequiredDataKeys<T> = DataKeys<Pick<T, RequiredKeys<T>>>;
type OptionalDataKeys<T> = DataKeys<Pick<T, OptionalKeys<T>>>;

type PropsFor<T> = Pick<T, RequiredDataKeys<T>> &
  Partial<Pick<T, OptionalDataKeys<T>>>;

/**
 * We need a small helper type: "Are all properties of T optional (or is T empty)?"
 * If making T partial doesn't change it, then T must already have no required keys.
 */
type AllOptionalOrEmpty<T> = [Partial<T>, T] extends [T, T] ? true : false;

function component<C extends new (...args: any[]) => any>(
  Class: C,
): () => InstanceType<C> {
  return () => new Class();
}

function makeFromClass<C extends new (...args: any[]) => any>(
  Class: C,
  props: PropsFor<InstanceType<C>>,
): InstanceType<C> {
  const instance = new Class();
  Object.assign(instance, props);
  return instance;
}

// function make<M extends () => any>(
//   maker: M,
//   props: PropsFor<ReturnType<M>>,
// ): ReturnType<M> {
//   const instance = maker();
//   Object.assign(instance, props);
//   return instance;
// }

/**
 * Single `make` function that:
 *   1) Allows omitting `props` if the target has no required props.
 *   2) Requires `props` if there is at least one required prop.
 *
 * We do this via a rest parameter with a conditional type:
 *    ...args: AllOptionalOrEmpty<PropsFor<T>> extends true
 *      ? [props?: PropsFor<T>]
 *      : [props: PropsFor<T>]
 */
function make<M extends () => any>(
  maker: M,
  ...args: AllOptionalOrEmpty<PropsFor<ReturnType<M>>> extends true
    ? // case 1: T is all-optional => second argument can be omitted or passed
      [props?: PropsFor<ReturnType<M>>]
    : // case 2: T has required props => second argument is mandatory
      [props: PropsFor<ReturnType<M>>]
): ReturnType<M> {
  const [props] = args; // either undefined or a required object
  const instance = maker();
  Object.assign(instance, props);
  return instance;
}

const Simple = component(
  class SimpleClass {
    name: string;
    prefix?: string;

    body() {
      console.log(this.prefix);
    }
  },
);

const x = make(Simple, { prefix: "test", name: "test" });
x.body();

const Greet = component(
  class GreetClass {
    times: number;
    name: string;
    prefix?: string;

    #greeting = "hi";

    body() {
      for (let i = 0; i < this.times; i++) {
        console.log(
          [this.#greeting, this.prefix, this.name].filter((n) => n).join(" "),
        );
      }
    }
  },
);
