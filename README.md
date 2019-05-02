<div align="center">
<h1>React+TypeScript Cheatsheets</h1>

<a href="https://github.com/sw-yx/react-typescript-cheatsheet/issues/81">
  <img
    height="90"
    width="90"
    alt="react + ts logo"
    src="https://user-images.githubusercontent.com/6764957/53868378-2b51fc80-3fb3-11e9-9cee-0277efe8a927.png"
    align="left"
  />
</a>

<p>Cheatsheets for experienced React developers getting started with TypeScript</p>

[**Basic**](https://github.com/sw-yx/react-typescript-cheatsheet#basic-cheatsheet-table-of-contents) |
[**Advanced**](https://github.com/sw-yx/react-typescript-cheatsheet/blob/master/ADVANCED.md) |
[**Migrating**](https://github.com/sw-yx/react-typescript-cheatsheet/blob/master/MIGRATING.md) |
[**HOC**](https://github.com/sw-yx/react-typescript-cheatsheet/blob/master/HOC.md) |
[中文翻译](https://github.com/fi3ework/blog/tree/master/react-typescript-cheatsheet-cn) |
[Contribute!](https://github.com/sw-yx/react-typescript-cheatsheet/blob/master/CONTRIBUTING.md) |
[Ask!](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new/choose)

</div>

---

<div align="center">

:wave: This repo is maintained by [@swyx](https://twitter.com/swyx), [@ferdaber](https://twitter.com/ferdaber), [@eps1lon](https://twitter.com/sebsilbermann) and [@IslamAttrash](https://twitter.com/IslamAttrash), we're so happy you want to try out TypeScript with React! If you see anything wrong or missing, please [file an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new/choose)! :+1:

</div>

---

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](/CONTRIBUTORS.md)

## All React + TypeScript Cheatsheets

- **The Basic Cheatsheet** ([`/README.md`](/README.md)) is focused on helping React devs just start using TS in React **apps**
  - focus on opinionated best practices, copy+pastable examples
  - explains some basic TS types usage and setup along the way
  - answers the most Frequently Asked Questions
  - does not cover generic type logic in detail. Instead we prefer to teach simple troubleshooting techniques for newbies.
  - The goal is to get effective with TS without learning _too much_ TS.
- **The Advanced Cheatsheet** ([`/ADVANCED.md`](/ADVANCED.md)) helps show and explain advanced usage of generic types for people writing reusable type utilities/functions/render prop/higher order components and TS+React **libraries**.
  - It also has miscellaneous tips and tricks for pro users.
  - Advice for contributing to DefinitelyTyped
  - The goal is to take _full advantage_ of TypeScript.
- **The Migrating Cheatsheet** ([`/MIGRATING.md`](/MIGRATING.md)) helps collate advice for incrementally migrating large codebases from JS or Flow, **from people who have done it**.
  - We do not try to convince people to switch, only to help people who have already decided
  - ⚠️This is a new cheatsheet, all assistance is welcome
- **The HOC Cheatsheet** ([`/HOC.md`](/HOC.md)) specifically teaches people to write HOCs with examples.
  - Familiarity with [Generics](https://www.typescriptlang.org/docs/handbook/generics.html) is necessary.
  - ⚠️This is the newest cheatsheet, all assistance is welcome

---

### Basic Cheatsheet Table of Contents

<details>

<summary><b>Expand Table of Contents</b></summary>

- [Section 1: Setup](#section-1-setup)
  - [Prerequisites](#prerequisites)
  - [React + TypeScript Starter Kits](#react--typescript-starter-kits)
  - [Import React](#import-react)
- [Section 2: Getting Started](#section-2-getting-started)
  - [Function Components](#function-components)
  - [Hooks](#hooks)
  - [Class Components](#class-components)
  - [Typing defaultProps](#typing-defaultprops)
  - [Types or Interfaces?](#types-or-interfaces)
  - [Basic Prop Types Examples](#basic-prop-types-examples)
  - [Useful React Prop Type Examples](#useful-react-prop-type-examples)
  - [Forms and Events](#forms-and-events)
  - [Context](#context)
  - [forwardRef/createRef](#forwardrefcreateref)
  - [Portals](#portals)
  - [Error Boundaries](#error-boundaries)
  - [Concurrent React/React Suspense](#concurrent-reactreact-suspense)
- [Basic Troubleshooting Handbook: Types](#basic-troubleshooting-handbook-types)
  - [Union Types and Type Guarding](#union-types-and-type-guarding)
  - [Optional Types](#optional-types)
  - [Enum Types](#enum-types)
  - [Type Assertion](#type-assertion)
  - [Intersection Types](#intersection-types)
  - [Using Inferred Types](#using-inferred-types)
  - [Using Partial Types](#using-partial-types)
  - [The Types I need Weren't Exported!](#the-types-i-need-werent-exported)
- [Troubleshooting Handbook: TSLint](#troubleshooting-handbook-tslint)
- [Troubleshooting Handbook: tsconfig.json](#troubleshooting-handbook-tsconfigjson)
- [Recommended React + TypeScript codebases to learn from](#recommended-react--typescript-codebases-to-learn-from)
- [Recommended React + TypeScript talks](#recommended-react--typescript-talks)
- [Editor Tooling and Integration](#editor-tooling-and-integration)
- [Other React + TypeScript resources](#other-react--typescript-resources)
- [Time to Really Learn TypeScript](#time-to-really-learn-typescript)
  </details>

# Section 1: Setup

## Prerequisites

1. good understanding of [React](https://reactjs.org)
2. familiarity with [TypeScript Types](https://www.typescriptlang.org/docs/handbook/basic-types.html) ([2ality's guide](http://2ality.com/2018/04/type-notation-typescript.html) is helpful)
3. having read [the TypeScript section in the official React docs](https://reactjs.org/docs/static-type-checking.html#typescript).

This guide will always assume you are starting with the latest TypeScript version. Notes for older versions will be in expandable `<details>` tags.

## React + TypeScript Starter Kits

1. [Create React App v2.1+ with Typescript](https://facebook.github.io/create-react-app/docs/adding-typescript): `npx create-react-app my-new-react-typescript-app --typescript`

- We used to recommend `create-react-app-typescript` but it is now [deprecated](https://www.reddit.com/r/reactjs/comments/a5919a/createreactapptypescript_has_been_archived_rip/). [see migration instructions](https://vincenttunru.com/migrate-create-react-app-typescript-to-create-react-app/)

2. [Basarat's guide](https://github.com/basarat/typescript-react/tree/master/01%20bootstrap) for **manual setup** of React + TypeScript + Webpack + Babel

- In particular, make sure that you have `@types/react` and `@types/react-dom` installed ([Read more about the DefinitelyTyped project if you are unfamiliar](https://definitelytyped.org/))
- There are also many React + TypeScript boilerplates, please see [our Resources list below](https://github.com/sw-yx/react-typescript-cheatsheet#recommended-react--typescript-codebases-to-learn-from).

## Import React

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
```

In [TypeScript 2.7+](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html), you can run TypeScript with `--allowSyntheticDefaultImports` (or add `"allowSyntheticDefaultImports": true` to tsconfig) to import like in regular jsx:

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
```

<details>

<summary>Explanation</summary>

Why `allowSyntheticDefaultImports` over `esModuleInterop`? [Daniel Rosenwasser](https://twitter.com/drosenwasser/status/1003097042653073408) has said that it's better for webpack/parcel. For more discussion check out <https://github.com/wmonk/create-react-app-typescript/issues/214>

Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!

</details>

# Section 2: Getting Started

## Function Components

These can be written as normal functions that take a `props` argument and return a JSX element.

```tsx
type AppProps = { message: string }; /* could also use interface */
const App = ({ message }: AppProps) => <div>{message}</div>;
```

<details>

<summary><b>What about `React.FC`/`React.FunctionComponent`?</b></summary>

You can also write components with `React.FunctionComponent` (or the shorthand `React.FC`):

```tsx
const App: React.FC<{ message: string }> = ({ message }) => (
  <div>{message}</div>
);
```

Some differences from the "normal function" version:

- It provides typechecking and autocomplete for static properties like `displayName`, `propTypes`, and `defaultProps` - **However**, there are currently known issues using `defaultProps` with `React.FunctionComponent`. See [this issue for details](https://github.com/sw-yx/react-typescript-cheatsheet/issues/87) - scroll down to our `defaultProps` section for typing recommendations there.

- It provides an implicit definition of `children` (see below) - however there are some issues with the implicit `children` type (e.g. [DefinitelyTyped#33006](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33006)), and it might considered better style to be explicit about components that consume `children`, anyway.

```tsx
const Title: React.FunctionComponent<{ title: string }> = ({
  children,
  title
}) => <div title={title}>{children}</div>;
```

- _In the future_, it may automatically mark props as `readonly`, though that's a moot point if the props object is destructured in the constructor.

- `React.FunctionComponent` is explicit about the return type, while the normal function version is implicit (or else needs additional annotation).

In most cases it makes very little difference which syntax is used, but the `React.FC` syntax is slightly more verbose without providing clear advantage, so precedence was given to the "normal function" syntax.

</details>

<details>
<summary><b>Minor Pitfalls</b></summary>

These patterns are not supported:

**Conditional rendering**

```tsx
const MyConditionalComponent = ({ shouldRender = false }) =>
  shouldRender ? <div /> : false; // don't do this in JS either
const el = <MyConditionalComponent />; // throws an error
```

This is because due to limitations in the compiler, function components cannot return anything other than a JSX expression or `null`, otherwise it complains with a cryptic error message saying that the other type is not assignable to `Element`.

```tsx
const MyArrayComponent = () => Array(5).fill(<div />);
const el2 = <MyArrayComponent />; // throws an error
```

**Array.fill**

Unfortunately just annotating the function type will not help so if you really need to return other exotic types that React supports, you'd need to perform a type assertion:

```tsx
const MyArrayComponent = () => (Array(5).fill(<div />) as any) as JSX.Element;
```

[See commentary by @ferdaber here](https://github.com/sw-yx/react-typescript-cheatsheet/issues/57).

</details>

## Hooks

Hooks are [supported in `@types/react` from v16.8 up](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/5565fe5e46e329a5ee02ddf739abe11bf16f278d/types/react/index.d.ts#L765-L973).

**useState**

Type inference works very well most of the time:

```tsx
const [val, toggle] = useState(false); // `val` is inferred to be a boolean, `toggle` only takes booleans
```

See also the [Using Inferred Types](#using-inferred-types) section if you need to use a complex type that you've relied on inference for.

However, many hooks are initialized with null-ish default values, and you may wonder how to provide types. Explicitly declare the type, and use a union type:

```tsx
const [user, setUser] = useState<IUser | null>(null);

// later...
setUser(newUser);
```

**useRef**

When using `useRef`, you have two options when creating a ref container that does not have an initial value:

```ts
const ref1 = useRef<HTMLElement>(null!)
const ref2 = useRef<HTMLElement | null>(null)
```

The first option will make `ref1.current` read-only, and is intended to be passed in to built-in `ref` attributes that React will manage (because React handles setting the `current` value for you).

The second option will make `ref2.current` mutable, and is intended for "instance variables" that you manage yourself.

**useEffect**

When using `useEffect`, take care not to return anything other than a function or `undefined`, otherwise both TypeScript and React will yell at you. This can be subtle when using arrow functions:

```ts
function DelayedEffect(props: { timerMs: number }) {
  const { timerMs } = props;
  // bad! setTimeout implicitly returns a number because the arrow function body isn't wrapped in curly braces
  useEffect(() => setTimeout(() => {/* do stuff */}, timerMs), [timerMs])
  return null
}
```

**useRef**

```tsx
function TextInputWithFocusButton() {
  // initialise with null, but tell TypeScript we are looking for an HTMLInputElement
  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    // strict null checks need us to check if inputEl and current exist.
    // but once current exists, it is of type HTMLInputElement, thus it
    // has the method focus! ✅
    if(inputEl && inputEl.current) {
      inputEl.current.focus();
    } 
  };
  return (
    <>
      { /* in addition, inputEl only can be used with input elements. Yay! */ }
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

example from [Stefan Baumgartner](https://fettblog.eu/typescript-react/hooks/#useref)

**useReducer**

You can use [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/advanced-types.html) for reducer actions. Don't forget to define the return type of reducer, otherwise Typescript will infer it.

```tsx
type Action =
  { type: 'SET_ONE'; payload: string; }
  | { type: 'SET_TWO'; payload: number; };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_ONE':
      return {
        ...state,
        one: action.payload // `payload` is string
      };
    case 'SET_TWO':
      return {
        ...state,
        two: action.payload // `payload` is number
      };
    default:
      return state;
  }
}
```

**Custom Hooks**

If you are returning an array in your Custom Hook, you will want to avoid type inference as Typescript will infer a union type (when you actually want different types in each position of the array). Instead, use [TS 3.4 const assertions](https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/#const-assertions):


```tsx
export function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  return [isLoading, load] as const // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}
```  

This way, when you destructure you actually get the right types based on destructure position.

<details>
<summary><b>Alternative: Asserting a tuple return type</b></summary>
  
If you are [having trouble with const assertions](https://github.com/babel/babel/issues/9800), you can also assert or define the function return types:

```tsx
export function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  return [isLoading, load] as [
    boolean,
    (aPromise: Promise<any>) => Promise<any>
  ];
}
```  


A helper function that automatically types tuples can also be helpful if you write a lot of custom hooks:
```ts
function tuplify<T extends any[]>(...elements: T) { return elements }

function useArray() {
  const numberValue = useRef(3).current
  const functionValue = useRef(() => {}).current
  return [numberValue, functionValue] // type is (number | (() => void))[]
}

function useTuple() {
  const numberValue = useRef(3).current
  const functionValue = useRef(() => {}).current
  return tuplify(numberValue, functionValue) // type is [number, () => void]
}
```

</details>

Note that the React team recommends that custom hooks that return more than two values should use proper objects instead of tuples, however.

More Hooks + TypeScript reading:

- https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d
- https://fettblog.eu/typescript-react/hooks/#useref

If you are writing a React Hooks library, don't forget that you should also expose your types for users to use.

Example React Hooks + TypeScript Libraries:

- https://github.com/mweststrate/use-st8
- https://github.com/palmerhq/the-platform
- https://github.com/sw-yx/hooks

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Class Components

Within TypeScript, `React.Component` is a generic type (aka `React.Component<PropType, StateType>`), so you want to provide it with (optional) prop and state type parameters:

```tsx
type MyProps = {
  // using `interface` is also ok
  message: string;
};
type MyState = {
  count: number; // like this
};
class App extends React.Component<MyProps, MyState> {
  state: MyState = {
    // optional second annotation for better type inference
    count: 0
  };
  render() {
    return (
      <div>
        {this.props.message} {this.state.count}
      </div>
    );
  }
}
```

Don't forget that you can export/import/extend these types/interfaces for reuse.

<details>
<summary><b>Why annotate `state` twice?</b></summary>

It isn't strictly necessary to annotate the `state` class property, but it allows better type inference when accessing `this.state` and also initializing the state.

This is because they work in two different ways, the 2nd generic type parameter will allow `this.setState()` to work correctly, because that method comes from the base class, but initializing `state` inside the component overrides the base implementation so you have to make sure that you tell the compiler that you're not actually doing anything different.

[See commentary by @ferdaber here](https://github.com/sw-yx/react-typescript-cheatsheet/issues/57).

</details>

<details>
  <summary><b>No need for <code>readonly</code></b></summary>

You often see sample code include `readonly` to mark props and state immutable:

```tsx
type MyProps = {
  readonly message: string;
};
type MyState = {
  readonly count: number;
};
```

This is not necessary as `React.Component<P,S>` already marks them as immutable. ([See PR and discussion!](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/26813))

</details>

**Class Methods**: Do it like normal, but just remember any arguments for your functions also need to be typed:

```tsx
class App extends React.Component<{ message: string }, { count: number }> {
  state = { count: 0 };
  render() {
    return (
      <div onClick={() => this.increment(1)}>
        {this.props.message} {this.state.count}
      </div>
    );
  }
  increment = (amt: number) => {
    // like this
    this.setState(state => ({
      count: state.count + amt
    }));
  };
}
```

**Class Properties**: If you need to declare class properties for later use, just declare it like `state`, but without assignment:

```tsx
class App extends React.Component<{
  message: string;
}> {
  pointer: number; // like this
  componentDidMount() {
    this.pointer = 3;
  }
  render() {
    return (
      <div>
        {this.props.message} and {this.pointer}
      </div>
    );
  }
}
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Typing defaultProps

For Typescript 3.0+, type inference [should work](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html), although [some edge cases are still problematic](https://github.com/sw-yx/react-typescript-cheatsheet/issues/61). Just type your props like normal, except don't use `React.FC`.

```tsx
// ////////////////
// function components
// ////////////////
type Props = { age: number } & typeof defaultProps;
const defaultProps = {
  who: 'Johny Five',
};

const Greet = (props: Props) => {
  /*...*/
};
Greet.defaultProps = defaultProps
```

For **Class components**, there are [a couple ways to do it](https://github.com/sw-yx/react-typescript-cheatsheet/pull/103#issuecomment-481061483)(including using the `Pick` utility type) but the recommendation is to "reverse" the props definition:

```tsx
type GreetProps = typeof Greet.defaultProps & {
  age: number
}

class Greet extends React.Component<GreetProps> {
  static defaultProps = {
    name: 'world'
  }
  /*...*/
}

// Type-checks! No type assertions needed!
let el = <Greet age={3} />;
```
<details>
  <summary>Why does React.FC break defaultProps?</summary>

  You can check the discussions here:

  - https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680
  - https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30695
  - https://github.com/sw-yx/react-typescript-cheatsheet/issues/87

  This is just the current state and may be fixed in future.

</details>

<details>
 <summary>Typescript 2.9 and earlier</summary>

For Typescript 2.9 and earlier, there's more than one way to do it, but this is the best advice we've yet seen:

```ts
type Props = Required<typeof MyComponent.defaultProps> & {
  /* additional props here */
};

export class MyComponent extends React.Component<Props> {
  static defaultProps = {
    foo: 'foo'
  };
}
```

Our former recommendation used the `Partial type` feature in TypeScript, which means that the current interface will fulfill a partial version on the wrapped interface. In that way we can extend defaultProps without any changes in the types!

```ts
interface IMyComponentProps {
  firstProp?: string;
  secondProp: IPerson[];
}

export class MyComponent extends React.Component<IMyComponentProps> {
  public static defaultProps: Partial<IMyComponentProps> = {
    firstProp: 'default'
  };
}
```

The problem with this approach is it causes complex issues with the type inference working with `JSX.LibraryManagedAttributes`. Basically it causes the compiler to think that when creating a JSX expression with that component, that all of its props are optional.

[See commentary by @ferdaber here](https://github.com/sw-yx/react-typescript-cheatsheet/issues/57).

</details>

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Types or Interfaces?

`interface`s are different from `type`s in TypeScript, but they can be used for very similar things as far as common React uses cases are concerned. Here's a helpful rule of thumb:

- always use `interface` for public API's definition when authoring a library or 3rd party ambient type definitions.

- consider using `type` for your React Component Props and State, because it is more constrained.

Types are useful for union types (e.g. `type MyType = TypeA | TypeB`) whereas Interfaces are better for declaring dictionary shapes and then `implementing` or `extending` them.

<details>
  <summary>
    <b>Useful table for Types vs Interfaces</b>
  </summary>
It's a nuanced topic, don't get too hung up on it. Here's a handy graphic:

![https://pbs.twimg.com/media/DwV-oOsXcAIct2q.jpg](https://pbs.twimg.com/media/DwV-oOsXcAIct2q.jpg) (source: [Karol Majewski](https://twitter.com/karoljmajewski/status/1082413696075382785))

</details>

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Basic Prop Types Examples

```tsx
type AppProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** array of a type! */
  names: string[];
  /** string literals to specify exact string values, with a union type to join them together */
  status: 'waiting' | 'success';
  /** any object as long as you dont use its properties (not common) */
  obj: object;
  obj2: {}; // same
  /** an object with defined properties (preferred) */
  obj3: {
    id: string;
    title: string;
  };
  /** array of objects! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function;
  /** function that doesn't take or return anything (VERY COMMON) */
  onClick: () => void;
  /** function with named prop (VERY COMMON) */
  onChange: (id: number) => void;
  /** an optional prop (VERY COMMON!) */
  optional?: OptionalType;
};
```

Notice we have used the TSDoc `/** comment */` style here on each prop. You can and are encouraged to leave descriptive comments on reusable components. For a fuller example and discussion, see our [Commenting Components](/ADVANCED.md#commenting-components) section in the Advanced Cheatsheet.

## Useful React Prop Type Examples

```tsx
export declare interface AppProps {
  children1: JSX.Element; // bad, doesnt account for arrays
  children2: JSX.Element | JSX.Element[]; // meh, doesnt accept functions
  children3: React.ReactChildren; // despite the name, not at all an appropriate type; it is a utility
  children3: React.ReactChild[]; // better
  children: React.ReactNode; // best, accepts everything
  functionChildren: (name: string) => React.ReactNode; // recommended function as a child render prop type
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
  props: Props & React.PropsWithoutRef<JSX.IntrinsicElements['button']>; // to impersonate all the props of a button element without its ref
}
```

<details>
 <summary><b>JSX.Element vs React.ReactNode?</b></summary>

Quote [@ferdaber](https://github.com/sw-yx/react-typescript-cheatsheet/issues/57): A more technical explanation is that a valid React node is not the same thing as what is returned by `React.createElement`. Regardless of what a component ends up rendering, `React.createElement` always returns an object, which is the `JSX.Element` interface, but `React.ReactNode` is the set of all possible return values of a component.

- `JSX.Element` -> Return value of `React.createElement`
- `React.ReactNode` -> Return value of a component
  </details>

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Forms and Events

If performance is not an issue, inlining handlers is easiest as you can just use type inference:

```tsx
const el = (
  <button onClick={event => {
      /* ... */
    }}
  />
);
```

But if you need to define your event handler separately, IDE tooling really comes in handy here, as the @type definitions come with a wealth of typing. Type what you are looking for and usually the autocomplete will help you out. Here is what it looks like for an `onChange` for a form event:

```tsx
class App extends React.Component<
  {},
  {
    // no props
    text: string;
  }
> {
  state = {
    text: ''
  };

  // typing on RIGHT hand side of =
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ text: e.currentTarget.value });
  };
  render() {
    return (
      <div>
        <input type="text" value={this.state.text} onChange={this.onChange} />
      </div>
    );
  }
}
```

Instead of typing the arguments and return values with `React.FormEvent<>` and `void`, you may alternatively apply types to the event handler itself (_contributed by @TomasHubelbauer_):

```tsx
  // typing on LEFT hand side of =
  onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({text: e.currentTarget.value})
  }
```

<details>

<summary><b>Why two ways to do the same thing?</b></summary>

The first method uses an inferred method signature `(e: React.FormEvent<HTMLInputElement>): void` and the second method enforces a type of the delegate provided by `@types/react`. So `React.ChangeEventHandler<>` is simply a "blessed" typing by `@types/react`, whereas you can think of the inferred method as more... _artisanally hand-rolled_. Either way it's a good pattern to know. [See our Github PR for more](https://github.com/sw-yx/react-typescript-cheatsheet/pull/24).

</details>

**Typing onSubmit, with Uncontrolled components in a Form**

If you don't quite care about the type of the event, you can just use React.SyntheticEvent. If your target form has custom named inputs that you'd like to access, you can use type widening:

```tsx
<form
    ref={formRef}
    onSubmit={(e: React.SyntheticEvent) => {
      e.preventDefault()
      const target = e.target as typeof e.target & { email: { value: string }; password: { value: string } }
      const email = target.email.value // typechecks!
      const password = target.password.value // typechecks!
      // etc...
    }}
  >
    <div>
      <label>
        Email:
        <input type="email" name="email" />
      </label>
    </div>
    <div>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
    </div>
    <div>
      <input type="submit" value="Log in" />
    </div>
</form>
```

Of course, if you're making any sort of significant form, [you should use Formik](https://jaredpalmer.com/formik), which is written in TypeScript.

## Context

Using `React.createContext` and [context getters](https://kentcdodds.com/blog/application-state-management-with-react/) to make a `createCtx` with no `defaultValue`, yet no need to check for `undefined`:

```tsx
// create context with no upfront defaultValue
// without having to do undefined check all the time
function createCtx<A>() {
  const ctx = React.createContext<A | undefined>(undefined)
  function useCtx() {
    const c = React.useContext(ctx)
    if (!c) throw new Error("useCtx must be inside a Provider with a value")
    return c
  }
  return [useCtx, ctx.Provider] as [() => A, typeof ctx.Provider]
}

// usage

export const [useCtx, SettingProvider] = createCtx<string>() // no need to specify value upfront!
export function App() {
  const key = useCustomHook('key') // get a value from a hook, must be in a component
  return (
    <SettingProvider value={key}>
      <Component />
    </SettingProvider>
  )
}
export function Component() {
  const key = useCtx() // can still use without null check!
  return <div>{key}</div>
}
```

Using `React.createContext` and `useContext` to make a `createCtx` with [`unstated`](https://github.com/jamiebuilds/unstated)-like context setters:

```tsx
export function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>
  const defaultUpdate: UpdateType = () => defaultValue
  const ctx = React.createContext({ state: defaultValue, update: defaultUpdate })
  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, update] = React.useState(defaultValue)
    return <ctx.Provider value={{ state, update }} {...props} />
  }
  return [ctx, Provider] as [typeof ctx, typeof Provider]
}

// usage

const [ctx, TextProvider] = createCtx("someText")
export const TextContext = ctx
export function App() {
  return (
    <TextProvider>
      <Component />
    </TextProvider>
  )
}
export function Component() {
  const { state, update } = React.useContext(TextProvider)
  return (
    <label>
      {state}
      <input type="text" onChange={e => update(e.target.value)} />
    </label>
  )
}
```

A [useReducer-based version](https://gist.github.com/sw-yx/f18fe6dd4c43fddb3a4971e80114a052) may also be helpful.

<details>

<summary><b>Mutable Context Using a Class component wrapper</b></summary>

_Contributed by: [@jpavon](https://github.com/sw-yx/react-typescript-cheatsheet/pull/13)_


```tsx
interface ProviderState {
  themeColor: string;
}

interface UpdateStateArg {
  key: keyof ProviderState;
  value: string;
}

interface ProviderStore {
  state: ProviderState;
  update: (arg: UpdateStateArg) => void;
}

const Context = React.createContext({} as ProviderStore); // type assertion on empty object

class Provider extends React.Component<{}, ProviderState> {
  public readonly state = {
    themeColor: 'red'
  };

  private update = ({ key, value }: UpdateStateArg) => {
    this.setState({ [key]: value });
  };

  public render() {
    const store: ProviderStore = {
      state: this.state,
      update: this.update
    };

    return (
      <Context.Provider value={store}>{this.props.children}</Context.Provider>
    );
  }
}

const Consumer = Context.Consumer;
```

</details>


[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## forwardRef/createRef


Check the [Hooks section](https://github.com/sw-yx/react-typescript-cheatsheet/blob/master/README.md) for `useRef`.

`createRef`:

```tsx
class CssThemeProvider extends React.PureComponent<Props> {
  private rootRef = React.createRef<HTMLDivElement>(); // like this
  render() {
    return <div ref={this.rootRef}>{this.props.children}</div>;
  }
}
```

`forwardRef`:

```tsx
type Props = { children: React.ReactNode; type: 'submit' | 'button' };
export type Ref = HTMLButtonElement;
export const FancyButton = React.forwardRef<Ref, Props>((props, ref) => (
  <button ref={ref} className="MyClassName" type={props.type}>
    {props.children}
  </button>
));
```


If you are grabbing the props of a component that forwards refs, use [`ComponentPropsWithRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L735).

More info: https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Portals

Using `ReactDOM.createPortal`:

```tsx
const modalRoot = document.getElementById('modal-root') as HTMLElement;
// assuming in your html file has a div with id 'modal-root';

export class Modal extends React.Component {
  el: HTMLElement = document.createElement('div');

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
```

<details>

<summary><b>Context of Example</b></summary>

This example is based on the [Event Bubbling Through Portal](https://reactjs.org/docs/portals.html#event-bubbling-through-portals) example of React docs.

</details>

## Error Boundaries

_Not written yet._

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Concurrent React/React Suspense

_Not written yet._ watch <https://github.com/sw-yx/fresh-async-react> for more on React Suspense and Time Slicing.

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

# Basic Troubleshooting Handbook: Types

Facing weird type errors? You aren't alone. This is the hardest part of using TypeScript with React. Be patient - you are learning a new language after all. However, the more you get good at this, the less time you'll be working _against_ the compiler and the more the compiler will be working _for_ you!

Try to avoid typing with `any` as much as possible to experience the full benefits of typescript. Instead, let's try to be familiar with some of the common strategies to solve these issues.

## Union Types and Type Guarding

Union types are handy for solving some of these typing problems:

```tsx
class App extends React.Component<
  {},
  {
    count: number | null; // like this
  }
> {
  state = {
    count: null
  };
  render() {
    return <div onClick={() => this.increment(1)}>{this.state.count}</div>;
  }
  increment = (amt: number) => {
    this.setState(state => ({
      count: (state.count || 0) + amt
    }));
  };
}
```

**Type Guarding**: Sometimes Union Types solve a problem in one area but create another downstream. Learn how to write checks, guards, and assertions (also see the Conditional Rendering section below). For example:

```tsx
interface Admin {
  role: string:
}
interface User {
  email: string;
}

// Method 1: use `in` keyword
function redirect(usr: Admin | User) {
  if("role" in usr) { // use the `in` operator for typeguards since TS 2.7+
    routeToAdminPage(usr.role);
  } else {
    routeToHomePage(usr.email);
  }
}

// Method 2: custom type guard, does the same thing in older TS versions or where `in` isnt enough
function isAdmin(usr: Admin | User): usr is Admin {
  return (<Admin>usr).role !==undefined
}
```

If you need `if...else` chains or the `switch` statement instead, it should "just work", but look up [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/advanced-types.html) if you need help. (See also: [Basarat's writeup](https://basarat.gitbooks.io/typescript/docs/types/discriminated-unions.html)). This is handy in typing reducers for `useReducer` or Redux.

## Optional Types

If a component has an optional prop, add a question mark and assign during destructure (or use defaultProps).

```tsx
class MyComponent extends React.Component<{
  message?: string; // like this
}> {
  render() {
    const { message = 'default' } = this.props;
    return <div>{message}</div>;
  }
}
```

You can also use a `!` character to assert that something is not undefined, but this is not encouraged.

_Something to add? [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!_

## Enum Types

Enums in TypeScript default to numbers. You will usually want to use them as strings instead:

```tsx
export enum ButtonSizes {
  default = 'default',
  small = 'small',
  large = 'large'
}
```

Usage:

```tsx
export const PrimaryButton = (
  props: Props & React.HTMLProps<HTMLButtonElement>
) => <Button size={ButtonSizes.default} {...props} />;
```

A simpler alternative to enum is just declaring a bunch of strings with union:

```tsx
export declare type Position = 'left' | 'right' | 'top' | 'bottom';
```

<details>

<summary>Brief Explanation</summary>

This is handy because TypeScript will throw errors when you mistype a string for your props.

</details>

## Type Assertion

Sometimes TypeScript is just getting your type wrong, or union types need to be asserted to a more specific type to work with other APIs, so assert with the `as` keyword. This tells the compiler you know better than it does.

```tsx
class MyComponent extends React.Component<{
  message: string;
}> {
  render() {
    const { message } = this.props;
    return (
      <Component2 message={message as SpecialMessageType}>{message}</Component2>
    );
  }
}
```

<details>

<summary>Explanation</summary>

Note that this is [not the same as casting](https://www.reddit.com/r/reactjs/comments/8o5owb/react_typescript_cheatsheet_for_react_users_using/e01d2md/?context=3).

Something to add? Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!

</details>

## Intersection Types

Adding two types together can be handy, for example when your component is supposed to mirror the props of a native component like a `button`:

```tsx
export interface Props {
  label: string;
}
export const PrimaryButton = (
  props: Props & React.HTMLProps<HTMLButtonElement> // adding my Props together with the @types/react button provided props
) => <Button {...props} />;
```

## Using Inferred Types

Leaning on Typescript's Type Inference is great... until you realize you need a type that was inferred, and have to go back and explicitly declare types/interfaces so you can export them for reuse.

Fortunately, with `typeof`, you won't have to do that. Just use it on any value:

```tsx
const [state, setState] = React.useState({
  foo: 1,
  bar: 2
}); // state's type inferred to be {foo: number, bar: number}

const someMethod = (obj: typeof state) => {
  // grabbing the type of state even though it was inferred
  // some code using obj
  setState(obj); // this works
};
```

## Using Partial Types

Working with slicing state and props is common in React. Again, you don't really have to go and explicitly redefine your types if you use the `Partial` generic type:

```tsx
const [state, setState] = React.useState({
  foo: 1,
  bar: 2
}); // state's type inferred to be {foo: number, bar: number}

// NOTE: stale state merging is not actually encouraged in React.useState
// we are just demonstrating how to use Partial here
const partialStateUpdate = (obj: Partial<typeof state>) =>
  setState({ ...state, ...obj });

// later on...
partialStateUpdate({ foo: 2 }); // this works
```

<details>
  <summary>
    Minor caveats on using <code>Partial</code>
  </summary>

Note that there are some TS users who don't agree with using `Partial` as it behaves today. See [subtle pitfalls of the above example here](https://twitter.com/ferdaber/status/1084798596027957248), and check out this long discussion on [why @types/react uses Pick instead of Partial](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18365).
</details>

## The Types I need weren't exported!

This can be annoying but here are ways to grab the types!

- Grabbing the Prop types of a component: Use `React.ComponentProps` and `typeof`, and optionally `Omit` any overlapping types

```tsx
import { Button } from 'library'; // but doesn't export ButtonProps! oh no!
type ButtonProps = React.ComponentProps<typeof Button>; // no problem! grab your own!
type AlertButtonProps = Omit<ButtonProps, 'onClick'>; // modify
const AlertButton: React.FC<AlertButtonProps> = props => (
  <Button onClick={() => alert('hello')} {...props} />
);
```

You may also use [`ComponentPropsWithoutRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/5565fe5e46e329a5ee02ddf739abe11bf16f278d/types/react/index.d.ts#L739) (instead of ComponentProps) and [`ComponentPropsWithRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/5565fe5e46e329a5ee02ddf739abe11bf16f278d/types/react/index.d.ts#L735) (if your component specifically forwards refs)

- Grabbing the return type of a function: use `ReturnType`:

```tsx
// inside some library - return type { baz: number } is inferred but not exported
function foo(bar: string) {
  return { baz: 1 };
}

//  inside your app, if you need { baz: number }
type FooReturn = ReturnType<typeof foo>; // { baz: number }
```
# Troubleshooting Handbook: Images and other non-TS/TSX files

Use [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html):

```ts
// declaration.d.ts
// anywhere in your project, NOT the same name as any of your .ts/tsx files
declare module '*.png'

// importing in a tsx file
import * as logo from "./logo.png";
```

Related issue: https://github.com/Microsoft/TypeScript-React-Starter/issues/12 and [StackOverflow](https://stackoverflow.com/a/49715468/4216035)

# Troubleshooting Handbook: TSLint

Sometimes TSLint is just getting in the way. Judiciously turning off of things can be helpful. Here are useful tslint disables you may use:

- `/* tslint:disable */` total disable
- `// tslint:disable-line` just this line
- `/* tslint:disable:semicolon */` sometimes prettier adds semicolons and tslint doesn't like it.
- `/* tslint:disable:no-any */` disable tslint restriction on no-any when you WANT to use any
- `/* tslint:disable:max-line-length */` disable line wrapping linting

so on and so forth. there are any number of things you can disable, usually you can look at the error raised in VScode or whatever the tooling and the name of the error will correspond to the rule you should disable.

<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!

</details>

# Troubleshooting Handbook: tsconfig.json

You can find [all the Compiler options in the Typescript docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html). This is the setup I roll with for my component library:

```json
{
  "compilerOptions": {
    "outDir": "build/lib",
    "module": "commonjs",
    "target": "es5",
    "lib": ["es5", "es6", "es7", "es2017", "dom"],
    "sourceMap": true,
    "allowJs": false,
    "jsx": "react",
    "moduleResolution": "node",
    "rootDir": "src",
    "baseUrl": "src",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "strict": true,
    "esModuleInterop": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true,
    "declaration": true,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "build", "scripts"]
}
```

Please open an issue and discuss if there are better recommended choices for React.

Selected flags and why we like them:

- `esModuleInterop`: disables namespace imports (`import * as foo from "foo"`) and enables CJS/AMD/UMD style imports (`import fs from "fs"`)
- `strict`: `strictPropertyInitialization` forces you to initialize class properties or explicitly declare that they can be undefined. You can opt out of this with a definite assignment assertion.

# Troubleshooting Handbook: Bugs in official typings

If you run into bugs with your library's official typings, you can copy them locally and tell TypeScript to use your local version using the "paths" field. In your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "mobx-react": ["../typings/modules/mobx-react"]
    }
  }
}
```

[Thanks to @adamrackis for the tip.](https://twitter.com/AdamRackis/status/1024827730452520963)

If you just need to add an interface, or add missing members to an existing interface, you don't need to copy the whole typing package. Instead, you can use [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html):

```tsx
// my-typings.ts
declare module 'plotly.js' {
  interface PlotlyHTMLElement {
    removeAllListeners(): void;
  }
}

// MyComponent.tsx
import { PlotlyHTMLElement } from 'plotly.js';
import './my-typings';
const f = (e: PlotlyHTMLElement) => {
  e.removeAllListeners();
};
```

# Recommended React + TypeScript codebases to learn from

- https://github.com/jaredpalmer/formik
- https://github.com/jaredpalmer/react-fns
- https://github.com/palantir/blueprint
- https://github.com/Shopify/polaris
- https://github.com/NullVoxPopuli/react-vs-ember/tree/master/testing/react
- https://github.com/artsy/reaction
- https://github.com/benawad/codeponder (with [coding livestream!](https://www.youtube.com/watch?v=D8IJOwdNSkc&list=PLN3n1USn4xlnI6kwzI8WrNgSdG4Z6daCq))
- https://github.com/artsy/emission (React Native)

React Boilerplates:

- [@jpavon/react-scripts-ts](https://github.com/jpavon/react-scripts-ts) alternative react-scripts with all TypeScript features using [ts-loader](https://github.com/TypeStrong/ts-loader)
- [webpack config tool](https://webpack.jakoblind.no/) is a visual tool for creating webpack projects with React and TypeScript
- <https://github.com/innFactory/create-react-app-material-typescript-redux> ready to go template with [Material-UI](https://material-ui.com/), routing and Redux

React Native Boilerplates: _contributed by [@spoeck](https://github.com/sw-yx/react-typescript-cheatsheet/pull/20)_

- https://github.com/GeekyAnts/react-native-seed
- https://github.com/lopezjurip/ReactNativeTS
- https://github.com/emin93/react-native-template-typescript
- <https://github.com/Microsoft/TypeScript-React-Native-Starter>

# Editor Tooling and Integration

- VSCode
  - swyx's VSCode Extension: https://github.com/sw-yx/swyx-react-typescript-snippets
  - amVim: https://marketplace.visualstudio.com/items?itemName=auiworks.amvim
- VIM
  - https://github.com/Quramy/tsuquyomi
  - nvim-typescript?
  - https://github.com/leafgarland/typescript-vim
  - peitalin/vim-jsx-typescript
  - NeoVim: https://github.com/neoclide/coc.nvim
  - other discussion: https://mobile.twitter.com/ryanflorence/status/1085715595994095620

# Other React + TypeScript resources

- me! <https://twitter.com/swyx>
- <https://github.com/piotrwitek/react-redux-typescript-guide> - **HIGHLY HIGHLY RECOMMENDED**, i wrote this repo before knowing about this one, this has a lot of stuff I don't cover, including **REDUX** and **JEST**.
- [Ultimate React Component Patterns with TypeScript 2.8](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)
- [Basarat's TypeScript gitbook has a React section](https://basarat.gitbooks.io/typescript/content/docs/jsx/react.html) with an [Egghead.io course](https://egghead.io/courses/use-typescript-to-develop-react-applications) as well.
- [Palmer Group's Typescript + React Guidelines](https://github.com/palmerhq/typescript) as well as Jared's other work like [disco.chat](https://github.com/jaredpalmer/disco.chat)
- [Sindre Sorhus' TypeScript Style Guide](https://github.com/sindresorhus/typescript-definition-style-guide)
- [TypeScript React Starter Template by Microsoft](https://github.com/Microsoft/TypeScript-React-Starter) A starter template for TypeScript and React with a detailed README describing how to use the two together. Note: this doesnt seem to be frequently updated anymore.
- [Brian Holt's Intermediate React course on Frontend Masters (paid)](https://frontendmasters.com/courses/intermediate-react/converting-the-app-to-typescript/) - Converting App To Typescript Section
- Typescript conversion:
  - [Lyft's React-To-Typescript conversion CLI](https://github.com/lyft/react-javascript-to-typescript-transform)
  - [Gustav Wengel's blogpost - converting a React codebase to Typescript](http://www.gustavwengel.dk/converting-typescript-to-javascript-part-1)
  - [Microsoft React Typescript conversion guide](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide)
- [You?](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

# Recommended React + TypeScript talks

- Please help contribute this new section!

# Time to Really Learn TypeScript

Believe it or not, we have only barely introduced TypeScript here in this cheatsheet. There is a whole world of generic type logic that you will eventually get into, however it becomes far less dealing with React than just getting good at TypeScript so it is out of scope here. But at least you can get productive in React now :)

It is worth mentioning some resources to help you get started:

- Anders Hejlsberg's overview of TS: https://www.youtube.com/watch?v=ET4kT88JRXs
- Marius Schultz: https://blog.mariusschulz.com/series/typescript-evolution with an [Egghead.io course](https://egghead.io/courses/advanced-static-types-in-typescript)
- Basarat's Deep Dive: https://basarat.gitbooks.io/typescript/
- Rares Matei: [Egghead.io course](https://egghead.io/courses/practical-advanced-typescript)'s advanced Typescript course on Egghead.io is great for newer typescript features and practical type logic applications (e.g. recursively making all properties of a type `readonly`)

# My question isn't answered here!

- Check out [the Advanced Cheatsheet](/ADVANCED.md)
- [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Contributors

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. See [CONTRIBUTORS.md](/CONTRIBUTORS.md) for the full list. Contributions of any kind welcome!
