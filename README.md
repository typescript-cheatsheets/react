
:wave: This repo is maintained by [@swyx](https://twitter.com/swyx) and [@IslamAttrash](https://twitter.com/IslamAttrash), we're so happy you want to try out TypeScript with React! This is meant to be an intermediate guide for React developers familiar with the concepts of TypeScript but who are just getting started writing their first React + TypeScript apps. If you see anything wrong or missing, please [file an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new)! :+1:

Translations: [中文翻译](https://github.com/fi3ework/blog/tree/master/react-typescript-cheatsheet-cn) *maintained by [@fi3ework](https://github.com/fi3ework/blog/tree/master/react-typescript-cheatsheet-cn)*

### Table of Contents

<details>

<summary><b>Expand Table of Contents</b></summary>

- [Section 1: Setup](#section-1-setup)
  * [Prerequisites](#prerequisites)
  * [React + TypeScript Starter Kits](#react--typescript-starter-kits)
  * [Import React](#import-react)
- [Section 2: Getting Started](#section-2-getting-started)
  * [Stateless Functional Components](#stateless-functional-components)
  * [Stateful Class-based Components](#stateful-class-based-components)
  * [Typing DefaultProps](#typing-defaultprops)
  * [Extracting Prop Types](#extracting-prop-types)
  * [Types or Interfaces?](#types-or-interfaces)
  * [Basic Prop Types Examples](#basic-prop-types-examples)
  * [Useful React Type Examples](#useful-react-type-examples)
  * [Forms and Events](#forms-and-events)
- [Section 3: Advanced Guides](#section-3-advanced-guides)
  * [Higher Order Components/Render Props](#higher-order-componentsrender-props)
  * [Context](#context)
  * [Forwarding References/createRef](#forwarding-referencescreateref)
  * [Portals](#portals)
  * [Error Boundaries](#error-boundaries)
  * [Timeout/Placeholder/createFetcher](#timeoutplaceholdercreatefetcher))
- [Section 4: Useful Patterns by TypeScript Version](#section-4-useful-patterns-by-typescript-version)
  * [TypeScript 2.9](#typescript-29)
  * [TypeScript 3.0](#typescript-30)
- [Section 5: Misc. Concerns](#section-5-misc-concerns)
  * [Writing TypeScript Libraries instead of Apps](#writing-typescript-libraries-instead-of-apps)
  * [Component/Design System Development](#componentdesign-system-development)
  * [Migrating from Flow](#migrating-from-flow)
  * [Prettier + TSLint](#prettier--tslint)
  * [ESLint + TSLint](#eslint--tslint)
  * [Working with Non-TypeScript Libraries (writing your own index.d.ts)](#working-with-non-typescript-libraries-writing-your-own-indexdts)
- [Troubleshooting Handbook: Types](#troubleshooting-handbook-types)
  * [Union types](#union-types)
  * [Optional Types](#optional-types)
  * [Enum Types](#enum-types)
  * [Type Assertion](#type-assertion)
  * [Intersection Types](#intersection-types)
  * [Types for Conditional Rendering](#types-for-conditional-rendering)
  * [Omit attribute from a type](#omit-attribute-from-a-type)
  * [Type Zoo](#type-zoo)
- [Troubleshooting Handbook: TSLint](#troubleshooting-handbook-tslint)
- [Troubleshooting Handbook: tsconfig.json](#troubleshooting-handbook-tsconfigjson)
- [Recommended React + TypeScript codebases to learn from](#recommended-react--typescript-codebases-to-learn-from)
- [Other React + TypeScript resources](#other-react--typescript-resources)
- [My question isn't answered here!](#my-question-isnt-answered-here)

</details>

# Section 1: Setup

## Prerequisites

1. good understanding of [React](https://reactjs.org)
2. familiarity with [TypeScript Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)
3. having read [the TypeScript section in the official React docs](https://reactjs.org/docs/static-type-checking.html#typescript).
4. (optional) Read Microsoft's [TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter) docs.

<details>
<summary><b>Note on Microsoft's TypeScript-React-Starter</b></summary>

[Adding state management](https://github.com/Microsoft/TypeScript-React-Starter#adding-state-management) Demo is out of date and requires following changes.

### In [Creating a store](https://github.com/Microsoft/TypeScript-React-Starter#creating-a-store)

```diff
 import { createStore } from 'redux';
 import { enthusiasm } from './reducers/index';
 import { StoreState } from './types/index';
+import { EnthusiasmAction } from './actions/index';
 import './index.css';
-const store = createStore<StoreState>(enthusiasm, {
+const store = createStore<StoreState, EnthusiasmAction, any, any>(enthusiasm, {
   enthusiasmLevel: 1,
   languageName: 'TypeScript',
 });
```

### In [Making a container](https://github.com/Microsoft/TypeScript-React-Starter#making-a-container)

```diff
import Hello from '../components/Hello';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
-import { connect, Dispatch } from 'react-redux';
+import { connect } from 'react-redux';
+import { Dispatch } from 'redux';
```
</details>

## React + TypeScript Starter Kits

1. based on `create-react-app`

- [wmonk](https://github.com/wmonk/create-react-app-typescript)'s script is officially recommended but has very strict tslint rules

   > In your command line: `create-react-app my-app --scripts-version=react-scripts-ts`

   > CodeSandbox has a [React TypeScript template](https://codesandbox.io/s/react-ts) based on this project. *Contributed by: [@antmdvs](https://github.com/sw-yx/react-typescript-cheatsheet/pull/11)*

- [jpavon](https://github.com/jpavon/react-scripts-ts) offers an alternative react-scripts-ts with Webpack 4 and better linting.

   > In your command line: `create-react-app my-app --scripts-version=@jpavon/react-scripts-ts`


2. <https://github.com/sw-yx/create-react-app-parcel-typescript> sets up a React + TypeScript app with Parcel :)
3. <https://github.com/basarat/typescript-react/tree/master/01%20bootstrap> for manual setup of React + TypeScript + Webpack + Babel
4. [webpack config tool](https://webpack.jakoblind.no/) is a visual tool for creating webpack projects with React and TypeScript

In particular, make sure that you have `@types/react` and `@types/react-dom` installed. [Read more about the DefinitelyTyped project if you are unfamiliar](https://definitelytyped.org/). There are also many React + TypeScript boilerplates, please see [our Resources list below](https://github.com/sw-yx/react-typescript-cheatsheet#recommended-react--typescript-codebases-to-learn-from).

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

## Stateless Functional Components

*Contributed by: [@jasanst](https://github.com/sw-yx/react-typescript-cheatsheet/pull/9) and [@tpetrina](https://github.com/sw-yx/react-typescript-cheatsheet/pull/21)*

You can specify the type of props as you destructure them:

```tsx
const App = ({ message }: { message: string }) => <div>{message}</div>;
```

Or you can use the provided generic type for functional components:

```tsx
const App: React.SFC<{ message: string }> = ({ message }) => <div>{message}</div>;
```

<details>

<summary><b>Discussion</b></summary>

The former pattern is shorter, so why would people use `React.SFC` at all? If you need to use `children` property inside the function body, in the former case it has to be added explicitly. `SFC<T>` already includes the correctly typed `children` property which then doesn't have to become part of your type.

```tsx
const Title: React.SFC<{ title: string }> = ({ children, title }) => (
    <div title={title}>{children}</div>
);
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

</details>

## Stateful Class-based Components

Within TypeScript, `React.Component` is a generic type (aka `React.Component<PropType, StateType>`), so you actually want to provide it with prop and (optionally) state types:

```tsx
class App extends React.Component<{
  message: string, // it takes one prop called 'message' which is a string type
}> {
  render() {
    return (
      <div>{this.props.message}</div>
    );
  }
}
```

If the component has state, here's how to add the types for the state:

```tsx
class App extends React.Component<{
  message: string, // this is the prop type
}, {
    count: number, // this is the state type
  }> {
  state = {
    count: 0
  }
  render() {
    return (
      <div>{this.props.message} {this.state.count}</div>
    );
  }
}
```

If you need to define a clickhandler, just do it like normal, but just remember any arguments for your functions also need to be typed:

```tsx
class App extends React.Component<{
  message: string,
}, {
    count: number,
  }> {
  state = {
    count: 0
  }
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

If you need to declare class properties for later use, just declare it with a type:

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

## Typing DefaultProps

It is easy to type a defaultProps static member of a React component. There's more than one way to do it, but since we want to show the neatest code as possible
we chose to propose this way of implementing them:

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

<details>

<summary>Explanation</summary>

This proposal is using `Partial type` feature in TypeScript, which means that the current interface will fulfill a partial
version on the wrapped interface. In that way we can extend defaultProps without any changes in the types!

The other suggestions was related to create a new interface that will look like this:

```ts
interface IMyComponentProps {
  firstProp: string;
  secondProp: IPerson[];
}

interface IMyComponentDefaultProps {
    firstProp: string;
}

export class MyComponent extends React.Component<IMyComponentProps, {}> {
  static defaultProps: IMyComponentDefaultProps = {
    firstProp: "default",
  };
}
```

The problem with this approach that if we need to add another prop in the future to the defaultProps map then we should update the
`IMyComponentDefaultProps`!
</details>

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Extracting Prop Types

Instead of defining prop types *inline*, you can declare them separately (useful for reusability or code organization):

```tsx
type AppProps = { message: string }
const App: React.SFC<AppProps> = ({ message }) => <div>{message}</div>;
```

You can also do this for stateful component types (really, any types):

```tsx
type AppProps = { // like this
  message: string,
}
type AppState = { // and this
  count: number,
}
class App extends React.Component<AppProps, AppState> {
  state = {
    count: 0
  }
  render() {
    return (
      <div>{this.props.message} {this.state.count}</div>
    );
  }
}
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Types or Interfaces?

`interface`s are different from `type`s in TypeScript, but they can be used for very similar things as far as common React uses cases are concerned. Here's a helpful rule of thumb:

- always use `interface` for public API's definition when authoring a library or 3rd party ambient type definitions.

- consider using `type` for your React Component Props and State, because it is more constrained.

[You can read more about the edge cases of using types and interfaces here](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c). Note there have been significant changes since TypeScript 2.1.

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Basic Prop Types Examples

```tsx
type AppProps = {
  message: string,
  count: number,
  disabled: boolean,
  names: string[], // array of a type!
  obj: object, // any object as long as you dont use it in your typescript code
  obj2: {}, // same
  object: {
   id: string,
   title: string
  }, // an object with defined properties
  objects: {
   id: string,
   title: string
  }[], // array of objects!
  onSomething: Function, // not recommended
  onClick: () => void, // function that doesn't return anything
  onChange: (id: number) => void, // function with named prop
  optional?: OptionalType, // an optional prop
}
```

## Useful React Type Examples

```tsx
export declare interface AppProps {
  children1: JSX.Element; // bad
  children2: JSX.Element | JSX.Element[]; // meh
  children3: React.ReactChild | React.ReactChildren; // better
  children: React.ReactNode; // best
  style?: React.CSSProperties; // for style
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void; // form events!
  props: Props & React.HTMLProps<HTMLButtonElement> // to impersonate all the props of a HTML element
}
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Forms and Events

This can be a bit tricky. The tooling really comes in handy here, as the @type definitions come with a wealth of typing. Type what you are looking for and usually the autocomplete will help you out. Here is what it looks like for an `onChange` for a form event:


```tsx
class App extends React.Component<{}, { // no props
    text: string,
  }> {
  state = {
    text: ''
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
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({text: e.currentTarget.value})
  }
}
```

Instead of typing the arguments and return values with `React.FormEvent<>` and `void`, you may alternatively apply types to the event handler itself (*contributed by @TomasHubelbauer*):

```tsx
  onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({text: e.currentTarget.value})
  }
```

<details>

<summary><b>Discussion</b></summary>

Why two ways to do the same thing? The first method uses an inferred method signature `(e: React.FormEvent<HTMLInputElement>): void` and the second method enforces a type of the delegate provided by `@types/react`. So `React.ChangeEventHandler<>` is simply a "blessed" typing by `@types/react`, whereas you can think of the inferred method as more... *artisanally hand-rolled*. Either way it's a good pattern to know. [See our Github PR for more](https://github.com/sw-yx/react-typescript-cheatsheet/pull/24).

</details>

# Section 3: Advanced Guides

## Higher Order Components/Render Props

Sometimes you will want to write a function that can take a React element or a string or something else as a prop. The best Type to use for such a situation is `React.ReactNode` which fits anywhere a normal, well, React Node would fit:

```tsx
import * as React from 'react';
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

const Context = React.createContext({} as ProviderStore)

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

*To be completed.*

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

**NOTE: not yet supported by `@types/react` as of Jul 2018**

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

For typing API's to force type checks - *should we include this?*

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

## Component/Design System Development

For developing with Storybook, read the docs I maintain over here: <https://storybook.js.org/configurations/typescript-config/>. This includes automatic proptype documentation generation, which is awesome :)

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

Facing weird type errors? You aren't alone. This is the worst part of using TypeScript with React. Try to avoid typing with `any` as much as possible to experience the full benefits of typescript. Instead, let's try to be familiar with some of the common strategies to solve these issues.

## Union types

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

<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>

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

<summary>Explanation</summary>

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

Components can render different things based on props that are passed in, and this can be confusing to type. Here is an example solution, see the further discussion for other solutions. *thanks to [@jpavon](https://github.com/sw-yx/react-typescript-cheatsheet/issues/12#issuecomment-394440577)*


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

const Button: React.SFC<Button> = (props) => {
  const {as: Component, children, ...rest} = props
  return (
    <Component className="button" {...rest}>{children}</Component>
  )
}

const AnchorButton: React.SFC<AnchorProps> = (props) => (
  <Button as="a" {...props} />
)

const LinkButton: React.SFC<RouterLinkProps> = (props) => (
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

This is the setup I roll with for my component library:

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
    "strictNullChecks": true,
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

Please open an issue and discuss if there are better recommended choices. I like noImplicitAny to force me to type things.

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
- https://github.com/artsy/emission (React Native)

React Boilerplates:

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
- [Basarat's TypeScript gitbook has a React section](https://basarat.gitbooks.io/typescript/content/docs/jsx/react.html) with an Egghead.io course as well.
- [Charles Bryant's gitbook](https://charleslbryant.gitbooks.io/hello-react-and-typescript/content/) 2yrs old and on the more basic side but has sample code and IDE advice.
- [TypeScript React Starter Template by Microsoft](https://github.com/Microsoft/TypeScript-React-Starter) A starter template for TypeScript and React with a detailed README describing how to use the two together.
- [You?](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

# My question isn't answered here!

[File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).
