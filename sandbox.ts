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

type ComponentArgs<C extends new (...args: any[]) => any> = AllOptionalOrEmpty<
	PropsFor<InstanceType<C>>
> extends true
	? // case 1: T is all-optional => second argument can be omitted or passed
		[props?: PropsFor<InstanceType<C>>]
	: // case 2: T has required props => second argument is mandatory
		[props: PropsFor<InstanceType<C>>];

function component<C extends new (...args: any[]) => any>(
	Class: C,
): (...args: ComponentArgs<C>) => InstanceType<C> {
	return (...args: ComponentArgs<C>) => {
		const instance = new Class();
		Object.assign(instance, args[0]);
		return instance;
	};
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

const s = Simple({ name: "hello" });
s.body();

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

const g = Greet({ name: "Kelty", times: 2 });
g.body();
