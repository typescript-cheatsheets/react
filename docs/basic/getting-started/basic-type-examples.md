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
  /** any object as long as you dont use its properties (NOT COMMON but useful as placeholder) */
  obj: object;
  obj2: {}; // almost the same as `object`, exactly the same as `Object`
  /** an object with any number of properties (PREFERRED) */
  obj3: {
    id: string;
    title: string;
  };
  /** array of objects! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  /** a dict object with any number of properties of the same type */
  dict1: {
    [key: string]: MyTypeHere;
  };
  dict2: Record<string, MyTypeHere>; // equivalent to dict1
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function;
  /** function that doesn't take or return anything (VERY COMMON) */
  onClick: () => void;
  /** function with named prop (VERY COMMON) */
  onChange: (id: number) => void;
  /** alternative function type syntax that takes an event (VERY COMMON) */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** an optional prop (VERY COMMON!) */
  optional?: OptionalType;
};
```

Notice we have used the TSDoc `/** comment */` style here on each prop. You can and are encouraged to leave descriptive comments on reusable components. For a fuller example and discussion, see our [Commenting Components](https://react-typescript-cheatsheet.netlify.app/docs/advanced/misc_concerns/#commenting-components) section in the Advanced Cheatsheet.

## Useful React Prop Type Examples

Relevant for components that accept other React components as props.

```tsx
export declare interface AppProps {
  children1: JSX.Element; // bad, doesnt account for arrays
  children2: JSX.Element | JSX.Element[]; // meh, doesn't accept strings
  children3: React.ReactChildren; // despite the name, not at all an appropriate type; it is a utility
  children4: React.ReactChild[]; // better, accepts array children
  children: React.ReactNode; // best, accepts everything (see edge case below)
  functionChildren: (name: string) => React.ReactNode; // recommended function as a child render prop type
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
  //  more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  props: Props & React.ComponentPropsWithoutRef<"button">; // to impersonate all the props of a button element and explicitly not forwarding its ref
  props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>; // to impersonate all the props of MyButtonForwardedRef and explicitly forwarding its ref
}
```

<details>
<summary>
Small `React.ReactNode` edge case
</summary>

This code typechecks but has a runtime error:

```tsx
type Props = {
  children: React.ReactNode;
};

function Comp({ children }: Props) {
  return <div>{children}</div>;
}
function App() {
  return <Comp>{{}}</Comp>; // Runtime Error: Objects not valid as React Child!
}
```

This is because `ReactNode` includes `ReactFragment` which allows a `{}` type, which is [too wide](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37596#issue-480260937). Fixing this would break a lot of libraries, so for now you just have to be mindful that `ReactNode` is not absolutely bulletproof.

[Thanks @pomle for raising this.](https://github.com/typescript-cheatsheets/react/issues/357)

</details>

<details>
 <summary><b>JSX.Element vs React.ReactNode?</b></summary>

Quote [@ferdaber](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/57): A more technical explanation is that a valid React node is not the same thing as what is returned by `React.createElement`. Regardless of what a component ends up rendering, `React.createElement` always returns an object, which is the `JSX.Element` interface, but `React.ReactNode` is the set of all possible return values of a component.

- `JSX.Element` -> Return value of `React.createElement`
- `React.ReactNode` -> Return value of a component

</details>

[More discussion: Where ReactNode does not overlap with JSX.Element](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/129)

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).

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

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).
