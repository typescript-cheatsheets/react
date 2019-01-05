:wave: This repo is maintained by [@swyx](https://twitter.com/swyx) and [@IslamAttrash](https://twitter.com/IslamAttrash), we're so happy you want to try out TypeScript with React! This is meant to be a guide for React developers familiar with the concepts of TypeScript but who are just getting started writing their first React + TypeScript apps. If you see anything wrong or missing, please [file an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new)! :+1:

Translations: 

- [中文翻译](https://github.com/fi3ework/blog/tree/master/react-typescript-cheatsheet-cn) *maintained by [@fi3ework](https://github.com/fi3ework/blog/tree/master/react-typescript-cheatsheet-cn)*
- Your language here?

### Table of Contents

<details>

<summary><b>Expand Table of Contents</b></summary>

- [Section 1: Setup](#section-1-setup)
  * [Prerequisites](#prerequisites)
  * [React + TypeScript Starter Kits](#react--typescript-starter-kits)
  * [Import React](#import-react)
- [Section 2: Getting Started](#section-2-getting-started)
  * [Function Components](#function-components)
  * [Class Components](#class-components)
  * [Typing defaultProps](#typing-defaultprops)
  * [Types or Interfaces?](#types-or-interfaces)
  * [Basic Prop Types Examples](#basic-prop-types-examples)
  * [Useful React Prop Type Examples](#useful-react-prop-type-examples)
  * [Forms and Events](#forms-and-events)
- [Section 3: Advanced Guides](#section-3-advanced-guides)
  * [Higher Order Components/Render Props](#higher-order-componentsrender-props)
  * [Hooks](#hooks)
  * [Context](#context)
  * [Forwarding References/createRef](#forwarding-referencescreateref)
  * [Portals](#portals)
  * [Error Boundaries](#error-boundaries)
  * [Timeout/Placeholder/createFetcher](#timeoutplaceholdercreatefetcher))
- [Section 4: Useful Patterns by TypeScript Version](#section-4-useful-patterns-by-typescript-version)
  * [TypeScript 2.9](#typescript-29)
  * [TypeScript 3.0](#typescript-30)
  * [TypeScript 3.1](#typescript-31)
  * [TypeScript 3.2](#typescript-32)
- [Section 5: Misc. Concerns](#section-5-misc-concerns)
  * [Writing TypeScript Libraries instead of Apps](#writing-typescript-libraries-instead-of-apps)
  * [Commenting Components](#commenting-components)
  * [Design System Development](#design-system-development)
  * [Migrating from Flow](#migrating-from-flow)
  * [Prettier + TSLint](#prettier--tslint)
  * [ESLint + TSLint](#eslint--tslint)
  * [Working with Non-TypeScript Libraries (writing your own index.d.ts)](#working-with-non-typescript-libraries-writing-your-own-indexdts)
- [Troubleshooting Handbook: Types](#troubleshooting-handbook-types)
  * [Union Types and Type Guarding](#union-types-and-type-guarding)
  * [Optional Types](#optional-types)
  * [Enum Types](#enum-types)
  * [Type Assertion](#type-assertion)
  * [Intersection Types](#intersection-types)
  * [Types for Conditional Rendering](#types-for-conditional-rendering)
  * [Omit attribute from a type](#omit-attribute-from-a-type)
  * [Type Zoo](#type-zoo)
  * [Third Party Libraries](#third-party-libraries)
- [Troubleshooting Handbook: TSLint](#troubleshooting-handbook-tslint)
- [Troubleshooting Handbook: tsconfig.json](#troubleshooting-handbook-tsconfigjson)
- [Recommended React + TypeScript codebases to learn from](#recommended-react--typescript-codebases-to-learn-from)
- [Other React + TypeScript resources](#other-react--typescript-resources)
- [My question isn't answered here!](#my-question-isnt-answered-here)

</details>

# Section 1: Setup

## Prerequisites

1. good understanding of [React](https://reactjs.org)
2. familiarity with [TypeScript Types](https://www.typescriptlang.org/docs/handbook/basic-types.html) ([2ality's guide](http://2ality.com/2018/04/type-notation-typescript.html) is helpful)
3. having read [the TypeScript section in the official React docs](https://reactjs.org/docs/static-type-checking.html#typescript).

This guide will always assume you are starting with the latest TypeScript version. Notes for older versions will be in expandable `<details>` tags.

## React + TypeScript Starter Kits

1. [Create React App v2.1+ with Typescript](https://facebook.github.io/create-react-app/docs/adding-typescript): `npm create react-app woot --typescript` 
 - see accompanying blogpost for migrating from [`create-react-app-typescript`](https://vincenttunru.com/migrate-create-react-app-typescript-to-create-react-app/) (now [deprecated](https://www.reddit.com/r/reactjs/comments/a5919a/createreactapptypescript_has_been_archived_rip/))
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

Why not `esModuleInterop`? [Daniel Rosenwasser](https://twitter.com/drosenwasser/status/1003097042653073408) has said that it's better for webpack/parcel. For more discussion check out <https://github.com/wmonk/create-react-app-typescript/issues/214>

Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>


# Section 2: Getting Started

## Function Components

*Contributed by: [@jasanst](https://github.com/sw-yx/react-typescript-cheatsheet/pull/9) and [@tpetrina](https://github.com/sw-yx/react-typescript-cheatsheet/pull/21)*

You can specify the type of props as you use them:

```tsx
const App = ({ message }: { message: string }) => <div>{message}</div>;
```

Or you can use the provided generic type for function components:

```tsx
const App: React.FunctionComponent<{ message: string }> = ({ message }) => <div>{message}</div>;
```

<details>

<summary><b>Whats the difference?</b></summary>

The former pattern is shorter, so why would people use `React.FunctionComponent` at all? If you need to use `children` property inside the function body, in the former case it has to be added explicitly. `FunctionComponent<T>` already includes the correctly typed `children` property which then doesn't have to become part of your type.

```tsx
const Title: React.FunctionComponent<{ title: string }> = ({ children, title }) => (
    <div title={title}>{children}</div>
);
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

</details>

<details>
<summary><b>Common Pitfalls</b></summary>

These patterns are not supported:

```tsx
const MyConditionalComponent = ({ shouldRender = false }) => shouldRender ? <div /> : false
const el = <MyConditionalComponent /> // throws an error

const MyArrayComponent = () => Array(5).fill(<div />)
const el2 = <MyArrayComponentt /> // throws an error
```

This is because due to limitations in the compiler, function components cannot return anything other than a JSX expression or `null`, otherwise it complains with a cryptic error message saying that the other type is not assignable to `Element`. Unfortunately just annotating the function type will not help so if you really need to return other exotic types that React supports, you'd need to perform a type assertion:

```tsx
const MyArrayComponent = () => Array(5).fill(<div />) as any as JSX.Element
```

[See commentary by @ferdaber here](https://github.com/sw-yx/react-typescript-cheatsheet/issues/57).

</details>

## Class Components

Within TypeScript, `React.Component` is a generic type (aka `React.Component<PropType, StateType>`), so you want to provide it with (optional) prop and state type parameters:

```tsx
type MyProps = { // using `interface` is also ok
  message: string
}
type MyState = {
  count: number // like this
}
class App extends React.Component<MyProps, MyState> {
  state: MyState = { // optional second annotation for better type inference
    count: 0
  }
  render() {
    return (
      <div>{this.props.message} {this.state.count}</div>
    );
  }
}
```

Don't forget that you can export/import/extend these types/interfaces for reuse.

<details>
<summary><b>Why annotate `state` twice?</b></summary>

It isn't strictly necessary to annotate the `state` class property, but it allows better type inference when accessing `this.state` and also initializing the state. This is because they work in two different ways, the 2nd generic type parameter will allow `this.setState()` to work correctly, because that method comes from the base class, but initializing `state` inside the component overrides the base implementation so you have to make sure that you tell the compiler that you're not actually doing anything different.

[See commentary by @ferdaber here](https://github.com/sw-yx/react-typescript-cheatsheet/issues/57).

</details>


**Class Methods**: Do it like normal, but just remember any arguments for your functions also need to be typed:

```tsx
class App extends React.Component<
  { message: string }, 
  { count: number }
  > {
  state = { count: 0 }
  render() {
    return (
      <div onClick={() => this.increment(1)}>{this.props.message} {this.state.count}</div>
    );
  }
  increment = (amt: number) => { // like this
    this.setState(state => ({
      count: state.count + amt
    }));
  }
}
```

**Class Properties**: If you need to declare class properties for later use, just declare it like `state`, but without assignment:

```tsx
class App extends React.Component<{
  message: string,
}> {
  pointer: number // like this
  componentDidMount() {
    this.pointer = 3;
  }
  render() {
    return (
      <div>{this.props.message} and {this.pointer}</div>
    );
  }
}
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Typing defaultProps

For Typescript 3.0+, type inference [just works](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html). Just type your props like normal.

```tsx
export interface Props {
    name: string;
}

export class Greet extends React.Component<Props> {
    render() {
        const { name } = this.props;
        return <div>Hello ${name.toUpperCase()}!</div>;
    }
    static defaultProps = { name: "world"};
}

// Type-checks! No type assertions needed!
let el = <Greet />
```

<details>
 <summary>Typescript 2.9 and earlier</summary>
 
For Typescript 2.9 and earlier, there's more than one way to do it, but this is the best advice we've yet seen:

```ts
type Props = Required<typeof MyComponent.defaultProps> & { /* additional props here */ }

export class MyComponent extends React.Component<Props> {
  static defaultProps = {
    foo: 'foo'
  }
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
    firstProp: "default",
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

Types are useful for union types (see below) whereas Interfaces are better for declaring shapes and then `implementing` or `extending` them.

[You can read more about the edge cases of using types and interfaces here](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c). Note there have been significant changes since TypeScript 2.1.

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Basic Prop Types Examples

```tsx
type AppProps = {
  message: string,
  count: number,
  disabled: boolean,
  /** array of a type! */
  names: string[], 
  /** string literals to specify exact string values */
  status: 'waiting' | 'success',
  /** any object as long as you dont use its properties (not common) */
  obj: object, 
  obj2: {}, // same
  /** an object with defined properties (preferred) */
  obj3: {
   id: string,
   title: string
  },
  /** array of objects! (common) */
  objArr: {
   id: string,
   title: string
  }[],
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function,
  /** function that doesn't take or return anything (VERY COMMON) */
  onClick: () => void,
  /** function with named prop (VERY COMMON) */
  onChange: (id: number) => void,
  /** an optional prop (VERY COMMON!) */
  optional?: OptionalType,
}
```

Notice we have used the TSDoc `/** comment */` style here on each prop. You can and are encouraged to leave descriptive comments on reusable components. For a fuller example and discussion, see our [Commenting Components](#commenting-components) section below.

## Useful React Prop Type Examples

```tsx
export declare interface AppProps {
  children1: JSX.Element;                            // bad, doesnt account for arrays
  children2: JSX.Element | JSX.Element[];            // meh, doesnt accept functions
  children3: React.ReactChild | React.ReactChildren; // better, but doesnt accept strings
  children: React.ReactNode;                         // best, accepts everything
  style?: React.CSSProperties;                       // to pass through style props
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void; // form events!
  props: Props & React.HTMLProps<HTMLButtonElement>  // to impersonate all the props of a HTML element
}
```

<details>
 <summary><b>JSX.Element vs React.ReactNode?</b></summary>

Quote [@ferdaber](https://github.com/sw-yx/react-typescript-cheatsheet/issues/57): A more technical explanation is that not everything that is a valid React node is not the same thing as what is returned by `React.createElement`. Regardless of what a component ends up rendering, `React.createElement` always returns an object, which is the `JSX.Element` interface, but `React.ReactNode` is the set of all possible return values of a component.

* `JSX.Element` -> Return value of `React.createElement`
* `React.ReactNode` -> Return value of a component
</details>

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Forms and Events

If performance is not an issue, inlining handlers is easiest as you can just use type inference:

```tsx
const el = <button onClick={event => {/* ... */}} />
```

But if you need to define your event handler separately, IDE tooling really comes in handy here, as the @type definitions come with a wealth of typing. Type what you are looking for and usually the autocomplete will help you out. Here is what it looks like for an `onChange` for a form event:

```tsx
class App extends React.Component<{}, { // no props
    text: string,
  }> {
  state = {
    text: ''
  }
  
  // typing on RIGHT hand side of =
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({text: e.currentTarget.value})
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.text}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
```

Instead of typing the arguments and return values with `React.FormEvent<>` and `void`, you may alternatively apply types to the event handler itself (*contributed by @TomasHubelbauer*):

```tsx
  // typing on LEFT hand side of =
  onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({text: e.currentTarget.value})
  }
```

<details>

<summary><b>Why two ways to do the same thing?</b></summary>

The first method uses an inferred method signature `(e: React.FormEvent<HTMLInputElement>): void` and the second method enforces a type of the delegate provided by `@types/react`. So `React.ChangeEventHandler<>` is simply a "blessed" typing by `@types/react`, whereas you can think of the inferred method as more... *artisanally hand-rolled*. Either way it's a good pattern to know. [See our Github PR for more](https://github.com/sw-yx/react-typescript-cheatsheet/pull/24).

</details>

# Section 3: Advanced Guides

## Higher Order Components (HoCs)

Sometimes you want a simple way to inject props from somewhere else (either a global store or a provider) and don't want to continually pass down the props for it. Context is great for it, but then the values from the context can only be used in your `render` function. A HoC will provide these values as props.

**The injected props**

```ts
interface WithThemeProps {
  primaryColor: string;
}
```

**Usage in the component**

The goal is to have the props available on the interface for the component, but subtracted out for the consumers of the component when wrapped in the HoC.

```ts

interface Props extends WithThemeProps {
  children: ReactNode;
}

class MyButton extends Component<Props> {
  public render() {
    // Render an the element using the theme and other props.
  }

  private someInternalMethod() {
    // The theme values are also available as props here.
  }
}

export default withTheme(MyButton);
```

**Consuming the Component**

Now when consuming the component you can omit the `primaryColor` prop or override the one provided through context.

```tsx
<MyButton>Hello button</MyButton> // Valid
<MyButton primaryColor="#333">Hello Button</MyButton> // Also valid
```

**Declaring the HoC**

The following utilities will be needed.

```ts
/**
 * Generic type utility to subtract keys from one interface from the other.
 *
 * @example
 * interface One { one: string }
 * interface Three { one: string, two: string }
 *
 * type Two = Omit<Three, keyof One>;
 *
 * // The type of Two will be
 * interface Two { two: string }
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Mark mark all the properies from K in T as optional.
 */
type Optionalize<T extends K, K> = Omit<T, keyof K>;
```

The actual HoC.

```ts
export function withTheme<T extends WithThemeProps = WithThemeProps>(WrappedComponent: React.ComponentType<T>) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  return class ComponentWithTheme extends React.Component<Optionalize<T, WithThemeProps>> {
    public static displayName = `withPages(${displayName})`;

    public render() {
      // Fetch the props you want inject. This could be done with context instead.
      const themeProps = getThemePropsFromSomeWhere();

      // this.props comes afterwards so the can override the default ones.
      return <WrappedComponent {...themeProps} {...this.props} />;
    }
  }
}
```

## Render Props

Sometimes you will want to write a function that can take a React element or a string or something else as a prop. The best Type to use for such a situation is `React.ReactNode` which fits anywhere a normal, well, React Node would fit:

```tsx
export interface Props {
  label?: React.ReactNode;
  children: React.ReactNode;
}
export const Card = (props: Props) => {
  return (
    <div>
      {props.label && <div>{props.label}</div>}
      {props.children}
    </div>
  );
};
```

If you are using a function-as-a-child render prop:

```tsx
export interface Props {
  children: (foo: string) => React.ReactNode;
}
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Hooks

Hooks are supported in `@types/react` from v16.7 up.

**useState**

Type inference works very well most of the time. However, many hooks are initialized with null-ish default values, and you may wonder how to provide types. Use union types:

```tsx
const [user, setUser] = useState<IUser | null>(null);

// later...
setUser(newUser)
```

**Custom Hooks**

If you are returning an array in your Custom Hook, you will want to avoid type inference as Typescript will infer a union type (when you actually want different types in each position of the array). Instead, assert or define the function return types:

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

If you are writing a React Hooks library, don't forget that you should also expose your types for users to use.

Example React Hooks + TypeScript Libraries:

- https://github.com/mweststrate/use-st8
- https://github.com/palmerhq/the-platform
- https://github.com/sw-yx/hooks

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Context

*Contributed by: [@jpavon](https://github.com/sw-yx/react-typescript-cheatsheet/pull/13)*

Using the new context API `React.createContext`:

```tsx
interface ProviderState {
  themeColor: string
}

interface UpdateStateArg {
  key: keyof ProviderState
  value: string
}

interface ProviderStore {
  state: ProviderState
  update: (arg: UpdateStateArg) => void
}

const Context = React.createContext({} as ProviderStore) // type assertion on empty object

class Provider extends React.Component<{}, ProviderState> {
  public readonly state = {
    themeColor: 'red'
  }

  private update = ({ key, value }: UpdateStateArg) => {
    this.setState({ [key]: value })
  }

  public render() {
    const store: ProviderStore = {
      state: this.state,
      update: this.update
    }

    return (
      <Context.Provider value={store}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

const Consumer = Context.Consumer
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Forwarding References/createRef

Use a `React.RefObject`:

```tsx
class CssThemeProvider extends React.PureComponent<Props> {
  private rootRef = React.createRef<HTMLDivElement>();
  render() {
    return <div ref={this.rootRef}>{this.props.children}</div>;
  }
}
```

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
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        )
    }
}
```

<details>

<summary><b>Context of Example</b></summary>

This example is based on the [Event Bubbling Through Portal](https://reactjs.org/docs/portals.html#event-bubbling-through-portals) example of React docs.

</details>

## Error Boundaries

*Not written yet.*

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Timeout/Placeholder/createFetcher

*Not written yet.* watch <https://github.com/sw-yx/fresh-async-react> for more on React Suspense and Time Slicing.

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

# Section 4: Useful Patterns by TypeScript Version

TypeScript Versions often introduce new ways to do things; this section helps current users of React + TypeScript upgrade TypeScript versions and explore patterns commonly used by TypeScript + React apps and libraries. This may have duplications with other sections; if you spot any discrepancies, [file an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new)!

*TypeScript version guides before 2.9 are unwritten, please feel free to send a PR!*

## TypeScript 2.9


[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/2018/05/31/announcing-typescript-2-9/)]

1. Type arguments for tagged template strings (e.g. `styled-components`):

```tsx
export interface InputFormProps {
    foo: string; // this is understood inside the template string below
}

export const InputForm = styledInput<InputFormProps> `
    color:
        ${({themeName}) => themeName === 'dark' ? 'black' : 'white'};
    border-color: ${({foo}) => foo ? 'red' : 'black'};
`;
```

2. **JSX Generics**

https://github.com/Microsoft/TypeScript/pull/22415

Helps with typing/using generic components:

```tsx
// instead of 
<Formik render={(props: FormikProps<Values>) => ....}/>

// usage
<Formik<Values> render={props => ...}/>
<MyComponent<number> data={12} />
```

More info: https://github.com/basarat/typescript-book/blob/master/docs/jsx/react.md#react-jsx-tip-generic-components

## TypeScript 3.0

[[Release Notes](https://github.com/Microsoft/TypeScript/releases/tag/v3.0.1) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/2018/07/30/announcing-typescript-3-0/)]

1. Typed rest parameters for writing arguments of variable length:

```ts
// `rest` accepts any number of strings - even none!
function foo(...rest: string[]) {
    // ...
}

foo("hello"); // works
foo("hello", "world"); // also works
```

2. Support for `propTypes` and `static defaultProps` in JSX using `LibraryManagedAttributes`:

```ts
export interface Props {
    name: string
}

export class Greet extends React.Component<Props> {
    render() {
        const { name } = this.props;
        return <div>Hello ${name.toUpperCase()}!</div>;
    }
    static defaultProps = { name: "world"}
}

// Type-checks! No type assertions needed!
let el = <Greet />
```

3. new `Unknown` type

For typing API's to force type checks - not specifically React related, however very handy for dealing with API responses:

```tsx
interface IComment {
    date: Date;
    message: string;
}

interface IDataService1 {
    getData(): any;
}

let service1: IDataService1;
const response = service1.getData();
response.a.b.c.d; // RUNTIME ERROR

// ----- compare with -------

interface IDataService2 {
    getData(): unknown; // ooo
}

let service2: IDataService2;
const response2 = service2.getData();
// response2.a.b.c.d; // COMPILE TIME ERROR if you do this

if (typeof response === 'string') {
    console.log(response.toUpperCase()); // `response` now has type 'string'
}
```

You can also assert a type, or use a **type guard** against an `unknown` type. This is better than resorting to `any`.

## TypeScript 3.1


[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/announcing-typescript-3-1/)]

1. Properties declarations on functions

Attaching properties to functions like this "just works" now:

```tsx
export const FooComponent => ({ name }) => (
    <div>Hello! I am {name}</div>
);

FooComponent.defaultProps = {
    name: "swyx",
};
```

## TypeScript 3.2

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/2018/11/29/announcing-typescript-3-2/)]

nothing specifically React related.

## TypeScript Roadmap

https://github.com/Microsoft/TypeScript/wiki/Roadmap

# Section 5: Misc. Concerns

Sometimes writing React isn't just about React. While we don't focus on other libraries like Redux (see below for more on that), here are some tips on other common concerns when making apps with React + TypeScript.

## Writing TypeScript Libraries instead of Apps

`propTypes` may seem unnecessary with TypeScript, especially when building React + TypeScript **apps**, but they are still relevant when writing **libraries** which may be used by developers working in Javascript.

```ts
interface IMyComponentProps {
  autoHeight: boolean;
  secondProp: number;
}

export class MyComponent extends React.Component<IMyComponentProps, {}> {
  static propTypes = {
    autoHeight: PropTypes.bool,
    secondProp: PropTypes.number.isRequired,
  };
}
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).


## Commenting Components

Typescript uses [TSDoc](https://github.com/Microsoft/tsdoc), a variant of JSDoc for Typescript. This is very handy for writing component libraries and having useful descriptions pop up in autocomplete and other tooling (like the [Docz PropsTable](https://www.docz.site/documentation/components-api#propstable)). The main thing to remember is to use `/** YOUR_COMMENT_HERE */` syntax in the line just above whatever you're annotating.

```tsx
import React from 'react';

interface MyProps {
  /** Description of prop "label".
   * @default foobar
   * */
  label?: string;
}

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
export default function MyComponent({ label = 'foobar' }: MyProps) {
  return <div>Hello world {label}</div>;
}
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Design System Development

I do like [Docz](https://docz.site/) which takes basically [1 line of config](https://www.docz.site/documentation/project-configuration#typescript) to accept Typescript. However it is newer and has a few more rough edges (many breaking changes since it is still < v1.0)

For developing with Storybook, read the docs I wrote over here: <https://storybook.js.org/configurations/typescript-config/>. This includes automatic proptype documentation generation, which is awesome :)

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Migrating From Flow

You may wish to use <https://github.com/piotrwitek/utility-types>. If you have specific advice in this area, please file a PR!

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Prettier + TSLint

*Contributed by: [@azdanov](https://github.com/sw-yx/react-typescript-cheatsheet/pull/14)*

To use prettier with TSLint you will need [`tslint-config-prettier`](https://github.com/alexjoverm/tslint-config-prettier) which disables all the conflicting rules and optionally [`tslint-plugin-prettier`](https://github.com/ikatyang/tslint-plugin-prettier) which will highlight differences as TSLint issues.

Example configuration:

<table>
    <tr>
        <th>
            <strong>tslint.json</strong>
        </th>
        <th>
            <strong>.prettierrc</strong>
        </th>
    </tr>
    <tr>
        <td>
            <pre>
{
  "rulesDirectory": ["tslint-plugin-prettier"],
  "extends": [
    "tslint:recommended",
    "tslint-config-prettier"
  ],
  "linterOptions": {
    "exclude": ["node_modules/**/*.ts"]
  },
  "rules": {
    "prettier": true
  }
}
            </pre>
        </td>
        <td>
            <pre>
{
  "printWidth": 89,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": false
}
            </pre>
        </td>
    </tr>
</table>

An example github repository with a project showing how to integrate [prettier + tslint + create-react-app-ts](https://github.com/azdanov/tslint-eslint-crats).

## ESLint + TSLint

Why? ESLint ecosystem is rich, with lots of different plugins and config files, whereas TSLint tend to lag behind in some areas.

To remedy this nuisance there is an [`eslint-typescript-parser`](https://github.com/eslint/typescript-eslint-parser) which tries to bridge the differences between javascript and typescript. It still has some rough corners, but can provide consistent assistance with certain plugins.

<table>
 <tr>
  <td>
   Usage
  </td>
  <td>
   .eslintrc
  </td>
 </tr>
 <tr>
  <td>
  <pre>
// Install:

npm i -D typescript-eslint-parser

// And in your ESLint configuration file:

"parser": "typescript-eslint-parser"
  </pre>
  </td>
  <td>
  <pre>
{
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
    "plugin:unicorn/recommended"
  ],
  "plugins": ["prettier", "jest", "unicorn"],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "jest": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "overrides": [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "parser": "typescript-eslint-parser",
      "rules": {
        "no-undef": "off"
      }
    }
  ]
}
  </pre>
  </td>
 </tr>
</table>

An example github repository with a project showing how to integrate [eslint + tslint + create-react-app-ts](https://github.com/azdanov/tslint-eslint-crats).

## Working with Non-TypeScript Libraries (writing your own index.d.ts)

*Not written yet.*

Please contribute on this topic! [We have an ongoing issue here with some references](https://github.com/sw-yx/react-typescript-cheatsheet/issues/8).



# Troubleshooting Handbook: Types

Facing weird type errors? You aren't alone. This is the worst part of using TypeScript with React. However, the more you get good at this, the less time you'll be working *against* the compiler and the more the compiler will be working *for* you! 

Try to avoid typing with `any` as much as possible to experience the full benefits of typescript. Instead, let's try to be familiar with some of the common strategies to solve these issues.

## Union Types and Type Guarding

Union types are handy for solving some of these typing problems:

```tsx
class App extends React.Component<{}, {
    count: number | null, // like this
  }> {
  state = {
    count: null
  }
  render() {
    return (
      <div onClick={() => this.increment(1)}>{this.state.count}</div>
    );
  }
  increment = (amt: number) => {
    this.setState(state => ({
      count: (state.count || 0) + amt
    }));
  }
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
function redirect(usr: Admin | User) {
  if("role" in usr) { // use the `in` operator for typeguards since TS 2.7+
    routeToAdminPage(usr.role);
  } else {
    routeToHomePage(usr.email);
  }
}

// custom type guard, does the same thing in older TS versions or where `in` isnt enough
function isAdmin(usr: Admin | User): usr is Admin {
  return (<Admin>usr).role !==undefined
}
```

If you need `if/elseif` chains or the `switch` statement instead, it should "just work", but look up [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/advanced-types.html) if you need help. (See also: [Basarat's writeup](https://basarat.gitbooks.io/typescript/docs/types/discriminated-unions.html)). This is handy in typing reducers for `useReducer` or Redux.

## Optional Types

If a component has an optional prop, add a question mark and assign during destructure (or use defaultProps).

```tsx
class MyComponent extends React.Component<{
  message?: string, // like this
}> {
  render() {
    const {message = 'default'} = this.props;
    return (
      <div>{message}</div>
    );
  }
}
```

You can also use a `!` character to assert that something is not undefined, but this is not encouraged.

*Something to add? [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!*

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
) => (
  <Button
    size={ButtonSizes.default}
    {...props}
  />
);
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
  message: string,
}> {
  render() {
    const {message} = this.props;
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

Adding two types together:

```tsx
export interface Props {
  label: string;
}
export const PrimaryButton = (
  props: Props & React.HTMLProps<HTMLButtonElement> // adding my Props together with the @types/react button provided props
) => (
  <Button
    {...props}
  />
);
```

## Types for Conditional Rendering

Components can render different things based on props that are passed in, and this can be confusing to model in terms of argument and return types. See the Type checks, guards, and assertion strategies discussed above as a first resort.

You can also do fairly advanced logic within your types ([they are Turing complete!](https://github.com/Microsoft/TypeScript/issues/14833)). Read the [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) section of the docs for ideas on how to use `Pick`, `ReadOnly`, `Partial`, and `Record`. Here is an example solution, see the further discussion for other solutions. *thanks to [@jpavon](https://github.com/sw-yx/react-typescript-cheatsheet/issues/12#issuecomment-394440577)*


```tsx
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface LinkProps {}

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type RouterLinkProps = Omit<NavLinkProps, 'href'>

const Link = <T extends {}>(
    props: LinkProps & T extends RouterLinkProps ? RouterLinkProps : AnchorProps
) => {
    if ((props as RouterLinkProps).to) {
        return <NavLink {...props as RouterLinkProps} />
    } else {
        return <a {...props as AnchorProps} />
    }
}

<Link<RouterLinkProps> to="/">My link</Link> // ok
<Link<AnchorProps> href="/">My link</Link> // ok
<Link<RouterLinkProps> to="/" href="/">My link</Link> // error
```

If you want to conditionaly render a component, sometimes is better to use [React's composition model](https://reactjs.org/docs/composition-vs-inheritance.html) to have simpler components and better to understand typings:

```tsx
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type RouterLinkProps = Omit<NavLinkProps, 'href'>

interface Button {
  as: React.ComponentClass | 'a'
}

const Button: React.FunctionComponent<Button> = (props) => {
  const {as: Component, children, ...rest} = props
  return (
    <Component className="button" {...rest}>{children}</Component>
  )
}

const AnchorButton: React.FunctionComponent<AnchorProps> = (props) => (
  <Button as="a" {...props} />
)

const LinkButton: React.FunctionComponent<RouterLinkProps> = (props) => (
  <Button as={NavLink} {...props} />
)

<LinkButton to="/login">Login</LinkButton>
<AnchorButton href="/login">Login</AnchorButton>
<AnchorButton href="/login" to="/test">Login</AnchorButton> // Error: Property 'to' does not exist on type...
```

<details>

<summary>Further Discussion</summary>

We have more discussion and examples [in our issue here](https://github.com/sw-yx/react-typescript-cheatsheet/issues/12).

</details>


## Omit attribute from a type

Sometimes when intersecting types, we want to define our own version of an attribute. For example, I want my component to have a `label`, but the type I am intersecting with also has a `label` attribute. Here's how to extract that out:

```tsx
export interface Props {
  label: React.ReactNode // this will conflict with the InputElement's label
}

// here is the magic - omitting an attribute
type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
// end of magic

// usage
export const Checkbox = (
  props: Props & Omit<React.HTMLProps<HTMLInputElement>, 'label'>
) => {
  const { label } = props;
  return (
    <div className='Checkbox'>
      <label className='Checkbox-label'>
        <input
          type="checkbox"
          {...props}
        />
      </label>
      <span>{label}</span>
    </div>
  );
};
```

## Type Zoo

As you can see from the Omit example above, you can write significant logic in your types as well. [type-zoo](https://github.com/pelotom/type-zoo) is a nice toolkit of operators you may wish to check out (includes Omit), as well as [utility-types](https://github.com/piotrwitek/utility-types) (especially for those migrating from Flow).

## Third Party Libraries

Sometimes DefinitelyTyped can get it wrong, or isn't quite addressing your use case. You can declare your own file with the same interface name. Typescript will merge interfaces with the same name.

# Troubleshooting Handbook: TSLint

Sometimes TSLint is just getting in the way. Judicious turning off of things can be helpful. Here are useful tslint disables you may use:

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
    "noImplicitThis": true,
    "noImplicitAny": true,
    "esModuleInterop": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
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
- `strictPropertyInitialization`: forces you to initialize class properties or explicitly declare that they can be undefined. You can opt out of this with a definite assignment assertion.

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
const f = (e: PlotlyHTMLElement) => { e.removeAllListeners(); }
```

<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>

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

- [jpavon](https://github.com/jpavon/react-scripts-ts) offers an alternative react-scripts-ts with Webpack 4 and better linting.
- [webpack config tool](https://webpack.jakoblind.no/) is a visual tool for creating webpack projects with React and TypeScript
- <https://github.com/innFactory/create-react-app-material-typescript-redux> ready to go template with [Material-UI](https://material-ui.com/), routing and Redux

React Native Boilerplates: *contributed by [@spoeck](https://github.com/sw-yx/react-typescript-cheatsheet/pull/20)*

- https://github.com/GeekyAnts/react-native-seed
- https://github.com/lopezjurip/ReactNativeTS
- https://github.com/emin93/react-native-template-typescript
- <https://github.com/Microsoft/TypeScript-React-Native-Starter>

# Other React + TypeScript resources

- me! <https://twitter.com/swyx>
- <https://github.com/piotrwitek/react-redux-typescript-guide> - **HIGHLY HIGHLY RECOMMENDED**, i wrote this repo before knowing about this one, this has a lot of stuff I don't cover, including **REDUX** and **JEST**.
- [Ultimate React Component Patterns with TypeScript 2.8](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)
- [Basarat's TypeScript gitbook has a React section](https://basarat.gitbooks.io/typescript/content/docs/jsx/react.html) with an [Egghead.io course](https://egghead.io/courses/use-typescript-to-develop-react-applications) as well.
- [Charles Bryant's gitbook](https://charleslbryant.gitbooks.io/hello-react-and-typescript/content/) 2yrs old and on the more basic side but has sample code and IDE advice.
- [Palmer Group's Typescript + React Guidelines](https://github.com/palmerhq/typescript) as well as Jared's other work like [disco.chat](https://github.com/jaredpalmer/disco.chat)
- [TypeScript React Starter Template by Microsoft](https://github.com/Microsoft/TypeScript-React-Starter) A starter template for TypeScript and React with a detailed README describing how to use the two together.
- [Brian Holt's Intermediate React course on Frontend Masters (paid)](https://frontendmasters.com/courses/intermediate-react/converting-the-app-to-typescript/) - Converting App To Typescript Section
- Typescript conversion:
  - [Lyft's React-To-Typescript conversion CLI](https://github.com/lyft/react-javascript-to-typescript-transform)
  - [Gustav Wengel's blogpost - converting a React codebase to Typescript](http://www.gustavwengel.dk/converting-typescript-to-javascript-part-1)
  - [Microsoft React Typescript conversion guide](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide)
- [You?](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

# Selected Advanced TypeScript resources

- Marius Schultz: https://blog.mariusschulz.com/series/typescript-evolution with an [Egghead.io course](https://egghead.io/courses/advanced-static-types-in-typescript)
- Basarat's Deep Dive: https://basarat.gitbooks.io/typescript/
- Rares Matei: [Egghead.io course](https://egghead.io/courses/practical-advanced-typescript)'s advanced Typescript course on Egghead.io is great for newer typescript features and practical type logic applications (e.g. recursively making all properties of a type `readonly`)

# My question isn't answered here!

[File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).
