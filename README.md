
<details>

<summary><h3>Table of Contents</h3></summary>

- [Prerequisites](#prerequisites)
- [React + Typescript Starter Kits](#react---typescript-starter-kits)
- [Import React](#import-react)
- [Stateless Functional Components](#stateless-functional-components)
- [Stateful Class-based Components](#stateful-class-based-components)
- [Extracting Prop Types](#extracting-prop-types)
- [Forms and Events](#forms-and-events)
- [Higher Order Components/Render Props](#higher-order-components-render-props)
- [Component/Design System Development](#component-design-system-development)
- [Building](#building)
- [Prettier + TSLint](#prettier---tslint)
- [Troubleshooting Handbook: Types](#troubleshooting-handbook--types)
  * [Union types](#union-types)
  * [Optional Types](#optional-types)
  * [Type Casting](#type-casting)
- [Troubleshooting Handbook: TSLint](#troubleshooting-handbook--tslint)
- [Troubleshooting Handbook: tsconfig.json](#troubleshooting-handbook--tsconfigjson)
- [Recommended React + Typescript codebases to learn from](#recommended-react---typescript-codebases-to-learn-from)
- [People you can ask React + Typescript questions about](#people-you-can-ask-react---typescript-questions-about)
- [My question isn't answered here!](#my-question-isn-t-answered-here-)


</details>


# Prerequisites

1. good understanding of [React](https://reactjs.org)
2. familiarity with [Typescript Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)

# React + Typescript Starter Kits

1. <https://github.com/wmonk/create-react-app-typescript> is the officially recommended Typescript fork of `create-react-app`.
2. <https://github.com/sw-yx/create-react-app-parcel> works with Typescript out of the box.
3. <https://github.com/basarat/typescript-react/tree/master/01%20bootstrap> for manual setup of React + Typescript + Webpack + Babel

In particular, make sure that you have `@types/react` and `@types/react-dom` installed. [Read more about the DefinitelyTyped project if you are unfamiliar](https://definitelytyped.org/).

# Import React

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
```

<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>


# Stateless Functional Components

You can specify the type of props as you destructure them:

```tsx
const App = ({ message: string }) => <div>{message}</div>;
```

Or you can use the provided generic type for functional components:

```tsx
const App: React.SFC<{ message: string }> = ({ message }) => <div>{message}</div>;
```

<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>

# Stateful Class-based Components

Within Typescript, `React.Component` is a generic type (aka `React.Component<PropType, StateType>`), so you actually want to provide it with prop and (optionally) state types:

```tsx
class App extends React.Component<{
  message: string, // like this
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
  message: string,
}, {
    count: number, // like this
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
    this.setState({
      count: this.state.count + amt
    });
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
<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>

# Extracting Prop Types

Instead of defining prop types inline, you can declare them separately (useful for reusability or code organization):

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

`interface`s are different from `type`s in Typescript, but for our purposes they do the same things. [read more](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c)

<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>

# Forms and Events

This can be a bit tricky. The tooling really comes in handy here, as the @type definitions come with a wealth of typing. Type what you are looking for and usually the autocomplete will help you out. Here is what it looks like for an `onChange` for a form event:


```tsx
class App extends React.Component<{}, { // no props
    count: string,
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

<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>
# Higher Order Components/Render Props

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
<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>

# Component/Design System Development

For developing with Storybook, read the docs I maintain over here: <https://storybook.js.org/configurations/typescript-config/>. This includes automatic proptype documentation generation, which is awesome :)

<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>

# Building

Please contribute on this topic! [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>

# Prettier + TSLint

Please contribute on this topic! [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>

# Troubleshooting Handbook: Types

Facing weird type errors? You aren't alone. This is the worst part of using Typescript with React. Try to avoid typing with `any` as much as possible to experience the full benefits of typescript. Instead, let's try to be familiar with some of the common strategies to solve these issues.

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
    this.setState({
      count: this.state.count + amt
    });
  }
}
```

<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>

## Optional Types

If a component has an optional prop, add a question mark :) and assign during destructure (or use defaultProps).

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

## Type Casting

Sometimes union types need to be cast to a more specific type to work with other APIs, so cast with the `as` keyword.


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

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>


## Intersection Types

Adding two types together:

```tsx
export interface Props {
  /** this dictates what the button will say  */
  label: string;
  /** this dictates what the button will do  */
  onClick: (e: any) => void; // tslint:disable-line
  /**
   * Options for the button styling
   *
   * @default {size: default, type: primary}
   *
   */
  displaytype?: {
    size?: ButtonSizes;
    type?: ButtonTypes;
  };
  /**
   * Disables onclick
   *
   * @default false
   */
  disabled?: boolean;
}
export const PrimaryButton = (
  props: Props & React.HTMLProps<HTMLButtonElement>
) => (
  <Button
    {...props}
  />
);
```

## Omit attribute from a type

Sometimes when intersecting types, we want to define our own version of an attribute. For example, I want my component to have a `label`, but the type I am intersecting with also has a `label` attribute. Here's how to extract that out:

```tsx
export interface Props {
  label: React.ReactNode
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
          checked={!!checkedclass}
          {...props}
        />
      </label>
      <span>{label}</span>
    </div>
  );
};
```

<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>

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

<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>

# Recommended React + Typescript codebases to learn from

- https://github.com/jaredpalmer/formik
- https://github.com/jaredpalmer/react-fns
- https://github.com/palantir/blueprint
- https://github.com/Shopify/polaris

<details>

<summary>Explanation</summary>

This is not yet written. Please PR or [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new) with your suggestions!
</details>

# People you can ask React + Typescript questions about

remember nobody owes you anything...

First try:

- [Google](https://google.com)
- [StackOverflow](https://stackoverflow.com)

Then: 

- me! <https://twitter.com/swyx>
- (maybe) Jared Palmer <https://twitter.com/jaredpalmer>
- [You?](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

# My question isn't answered here!

[File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).
