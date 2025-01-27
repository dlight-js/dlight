type AnyClass = new (...args: any[]) => any;
type AnyFn = (...args: any[]) => any;

/** Extracts the keys of T that are declared optional. */
type OptionalKeys<T> = {
	[K in keyof T]-?: T extends Record<K, T[K]> ? never : K;
}[keyof T];

/** Utility type for the setter functions. */
type SetterFunction<T, K extends keyof T> = K extends OptionalKeys<T>
	? // Replace with fn having optional param if property was optional
		(value?: T[K]) => TransformInstance<T>
	: // Replace with fn having required param if property was required
		(value: T[K]) => TransformInstance<T>;

type TransformInstance<T> = {
	// Strip optionality (`-?`) of properties
	[K in keyof T]-?: T[K] extends AnyFn
		? T[K] // Keep methods unchanged
		: SetterFunction<T, K>; // Transform properties into setter functions
};

function component<C extends AnyClass>(
	Class: C,
): (...args: ConstructorParameters<C>) => TransformInstance<InstanceType<C>> {
	return (...args: ConstructorParameters<C>) => {
		const instance = new Class(...args);
		return new Proxy({} as TransformInstance<InstanceType<C>>, {
			get(_, prop: PropertyKey, receiver) {
				if (typeof instance[prop] === "function") {
					return instance[prop].bind(instance); // Forward methods
				}
				return (value: unknown) => {
					instance[prop] = value;
					return receiver;
				};
			},
		});
	};
}

const Greet = component(
	class GreetClass {
		times: number;
		name: string;
		prefix?: string;

		#greeting = "hi";

		constructor(public links: string[]) {}

		body() {
			for (let i = 0; i < this.times; i++) {
				console.log(
					[this.#greeting, this.prefix, this.name].filter(Boolean).join(" "),
				);
			}
		}
	},
);

const g = Greet(["hello"]).name("KJ");
// g.body();
