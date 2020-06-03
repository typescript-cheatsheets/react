---
id: class_components
title: Class Components
---

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
    count: 0,
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

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCmATzCTgFlqAFHMAZzgF44BvCuHAD0QuAFd2wAHYBzOAANpMJFEzok8uME4oANuwhwIAawFwQSduxQykALjjsYUaTIDcFAL4fyNOo2oAZRgUZW4+MzQIMSkYBykxEAAjFTdhUV1gY3oYAAttLx80XRQrOABBMDA4JAAPZSkAE05kdBgAOgBhXEgpJFiAHiZWCA4AGgDg0KQAPgjyQSdphyYpsJ5+BcF0ozAYYAgpPUckKKa4FCkpCBD9w7hMaDgUmGUoOD96aUwVfrQkMyCKIxOJwAAMZm8ZiITRUAAoAJTzbZwIgwMRQKRwOGA7YDRrAABuM1xKN4eW07TAbHY7QsVhsSE8fAptKWynawNinlJcAGQgJxNxCJ8gh55E8QA)

Don't forget that you can export/import/extend these types/interfaces for reuse.

<details>
<summary><b>Why annotate <code>state</code> twice?</b></summary>

It isn't strictly necessary to annotate the `state` class property, but it allows better type inference when accessing `this.state` and also initializing the state.

This is because they work in two different ways, the 2nd generic type parameter will allow `this.setState()` to work correctly, because that method comes from the base class, but initializing `state` inside the component overrides the base implementation so you have to make sure that you tell the compiler that you're not actually doing anything different.

[See commentary by @ferdaber here](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/57).

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
    this.setState((state) => ({
      count: state.count + amt,
    }));
  };
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BBMMOJADxiQDsATRsnQwAdAGFckHrxgAeAN5wQSBigDmSAFxw6MKMB5q4AXwA0cRWggBXHjG09rIAEZIoJgHwWKcHTBTccAC8FnBWtvZwAAwmANw+cET8bgAUAJTe5L6+RDDWUDxwKQnZcLJ8wABucBA8YtTAaADWQfLpwV4wABbAdCIGaETKdikAjGnGHiWlFt29ImA4YH3KqhrGsz19ugFIIuF2xtO+sgD0FZVTWdlp8ddH1wNDMsFFKCCRji5uGUFe8tNTqc4A0mkg4HM6NNISI6EgYABlfzcFI7QJ-IoA66lA6RNF7XFwADUcHeMGmxjStwSxjuxiAA)

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

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BBMMOJADxiQDsATRsnQwAdAGFckHrxgAeAN4U4cEEgYoA5kgBccOjCjAeGgNwUAvgD44i8sshHuUXTwCuIAEZIoJuAHo-OGpgAGskOBgAC2A6JTg0SQhpHhgAEWA+AFkIVxSACgBKGzjlKJiRBxTvOABeOABmMzs4cziifm9C4ublIhhXKB44PJLlOFk+YAA3S1GxmzK6CpwwJdV1LXM4FH4F6KXKp1aesdk-SZnRgqblY-MgA)

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).
