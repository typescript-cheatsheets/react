# Table of Contents

- [Prerequisites](#prerequisites)
- [React + Typescript Starter Kits](#react---typescript-starter-kits)
- [Import React](#import-react)
- [Stateless Functional Components](#stateless-functional-components)
- [Stateful Class-based Components](#stateful-class-based-components)
- [Extracting Prop Types](#extracting-prop-types)
- [Forms and Events](#forms-and-events)
- [Type Troubleshooting Handbook](#type-troubleshooting-handbook)
  * [Union types](#union-types)
  * [Optional Types](#optional-types)
  * [Type Casting](#type-casting)
- [My question isn't answered here!](#my-question-isn-t-answered-here-)

# Prerequisites

1. good understanding of [React](https://reactjs.org)
2. familiarity with [Typescript Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)

# React + Typescript Starter Kits

1. <https://github.com/wmonk/create-react-app-typescript> is the officially recommended Typescript fork of `create-react-app`.
2. <https://github.com/sw-yx/create-react-app-parcel> works with Typescript out of the box.
3. <https://github.com/basarat/typescript-react/tree/master/01%20bootstrap> for manual setup of React + Typescript + Webpack + Babel

In particular, make sure that you have `@types/react` and `@types/react-dom` installed. [Read more about the DefinitelyTyped project if you are unfamiliar](https://definitelytyped.org/)

# Import React

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
```

# Stateless Functional Components

You can specify the type of props as you destructure them:

```tsx
const App = ({ message: string }) => <div>{message}</div>;
```

Or you can use the provided generic type for functional components:

```tsx
const App: React.SFC<{ message: string }> = ({ message }) => <div>{message}</div>;
```

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

# Type Troubleshooting Handbook

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

# My question isn't answered here!

[File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).
