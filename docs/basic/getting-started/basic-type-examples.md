---
id: basic_type_example
title: Typing Component Props
---

This is intended as a basic orientation and reference for React developers familiarizing with TypeScript.

## Basic Prop Types Examples

A list of TypeScript types you will likely use in a React+TypeScript app:

```tsx
type AppProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** array of a type! */
  names: string[];
  /** string literals to specify exact string values, with a union type to join them together */
  status: "waiting" | "success";
  /** an object with known properties (but could have more at runtime) */
  obj: {
    id: string;
    title: string;
  };
  /** array of objects! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  /** any non-primitive value - can't access any properties (NOT COMMON but useful as placeholder) */
  obj2: object;
  /** an interface with no required properties - (NOT COMMON, except for things like `React.Component<{}, State>`) */
  obj3: {};
  /** a dict object with any number of properties of the same type */
  dict1: {
    [key: string]: MyTypeHere;
  };
  dict2: Record<string, MyTypeHere>; // equivalent to dict1
  /** function that doesn't take or return anything (VERY COMMON) */
  onClick: () => void;
  /** function with named prop (VERY COMMON) */
  onChange: (id: number) => void;
  /** function type syntax that takes an event (VERY COMMON) */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** alternative function type syntax that takes an event (VERY COMMON) */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function;
  /** an optional prop (VERY COMMON!) */
  optional?: OptionalType;
  /** when passing down the state setter function returned by `useState` to a child component. `number` is an example, swap out with whatever the type of your state */
  setState: React.Dispatch<React.SetStateAction<number>>;
};
```

Notice we have used the TSDoc `/** comment */` style here on each prop. You can and are encouraged to leave descriptive comments on reusable components. For a fuller example and discussion, see our [Commenting Components](https://react-typescript-cheatsheet.netlify.app/docs/advanced/misc_concerns/#commenting-components) section in the Advanced Cheatsheet.

<details>
<summary>More on object types: <code>object</code>, <code>{"{}"}</code>, etc</summary>

In Typescript, it's generally best to use specific types for objects. In most cases, this means a literal type like <code>{ id: string; name: string }</code>. In cases where there isn't a fixed structure for an object, you likely either want an index signature (possibly with the <code>Record</code> shorthand) - if there are values of a certain type, but the keys can change - or else <a href="https://www.typescriptlang.org/docs/handbook/2/generics.html">generics</a> - if the object structure is more-or-less an arbitrary black-box.

Another approach to objects is the <code>Map</code> data structure, but this is somewhat uncommon to use in React, because React prefers data to be changed immutably (e.g. <code>setUser({...user, name: newName})</code>), while Maps are mutable data structures.

"Vague" object types like <code>object</code>, <code>{}</code> are fairly niche and should be rarely used, and may function differently than you expect. <code>object</code> is any non-primitive value: this includes things like functions and arrays and constructors, not just "simple" objects. And <code>{}</code> is perhaps better thought of as "an interface with no required properties", not "an empty object" - in practice this type allows anything except <code>null</code> or <code>undefined</code>. <code>Object</code> behaves the same as <code>{}</code> and is basically never used.

</details>

## Useful React Prop Type Examples

Relevant for components that accept other React components as props.

```tsx
export declare interface AppProps {
  children?: React.ReactNode; // best, accepts everything React can render
  childrenElement: JSX.Element; // A single React element
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
  //  more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  props: Props & React.ComponentPropsWithoutRef<"button">; // to impersonate all the props of a button element and explicitly not forwarding its ref
  props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>; // to impersonate all the props of MyButtonForwardedRef and explicitly forwarding its ref
}
```

<details>
<summary><b>Small <code>React.ReactNode</code> edge case before React 18</b></summary>

Before the [React 18 type updates](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210), this code typechecked but had a runtime error:

```tsx
type Props = {
  children?: React.ReactNode;
};

function Comp({ children }: Props) {
  return <div>{children}</div>;
}
function App() {
  // Before React 18: Runtime error "Objects are not valid as a React child"
  // After React 18: Typecheck error "Type '{}' is not assignable to type 'ReactNode'"
  return <Comp>{{}}</Comp>;
}
```

This is because `ReactNode` includes `ReactFragment` which allowed type `{}` before React 18.

[Thanks @pomle for raising this.](https://github.com/typescript-cheatsheets/react/issues/357)

</details>

<details>
 <summary><b>JSX.Element vs React.ReactNode?</b></summary>

Quote [@ferdaber](https://github.com/typescript-cheatsheets/react/issues/57): A more technical explanation is that a valid React node is not the same thing as what is returned by `React.createElement`. Regardless of what a component ends up rendering, `React.createElement` always returns an object, which is the `JSX.Element` interface, but `React.ReactNode` is the set of all possible return values of a component.

- `JSX.Element` -> Return value of `React.createElement`
- `React.ReactNode` -> Return value of a component

</details>

[More discussion: Where ReactNode does not overlap with JSX.Element](https://github.com/typescript-cheatsheets/react/issues/129)

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

## Types or Interfaces?

You can use either Types or Interfaces to type Props and State, so naturally the question arises - which do you use?

### TL;DR

Use Interface until You Need Type - [orta](https://twitter.com/orta/status/1356129195835973632?s=20).

### More Advice

Here's a helpful rule of thumb:

- always use `interface` for public API's definition when authoring a library or 3rd party ambient type definitions, as this allows a consumer to extend them via _declaration merging_ if some definitions are missing.

- consider using `type` for your React Component Props and State, for consistency and because it is more constrained.

You can read more about the reasoning behind this rule of thumb in [Interface vs Type alias in TypeScript 2.7](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c).

The TypeScript Handbook now also includes guidance on [Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).

> Note: At scale, there are performance reasons to prefer interfaces ([see official Microsoft notes on this](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections)) but [take this with a grain of salt](https://news.ycombinator.com/item?id=25201887)

Types are useful for union types (e.g. `type MyType = TypeA | TypeB`) whereas Interfaces are better for declaring dictionary shapes and then `implementing` or `extending` them.

### Useful table for Types vs Interfaces

It's a nuanced topic, don't get too hung up on it. Here's a handy table:

| Aspect                                          | Type | Interface |
| ----------------------------------------------- | :--: | :-------: |
| Can describe functions                          |  ✅  |    ✅     |
| Can describe constructors                       |  ✅  |    ✅     |
| Can describe tuples                             |  ✅  |    ✅     |
| Interfaces can extend it                        |  ⚠️  |    ✅     |
| Classes can extend it                           |  🚫  |    ✅     |
| Classes can implement it (`implements`)         |  ⚠️  |    ✅     |
| Can intersect another one of its kind           |  ✅  |    ⚠️     |
| Can create a union with another one of its kind |  ✅  |    🚫     |
| Can be used to create mapped types              |  ✅  |    🚫     |
| Can be mapped over with mapped types            |  ✅  |    ✅     |
| Expands in error messages and logs              |  ✅  |    🚫     |
| Can be augmented                                |  🚫  |    ✅     |
| Can be recursive                                |  ⚠️  |    ✅     |

⚠️ In some cases

(source: [Karol Majewski](https://twitter.com/karoljmajewski/status/1082413696075382785))

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).
